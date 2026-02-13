// Speech bubble generator - soft, organic shape with gentle character

export class SpeechBubble {
    constructor() {
        this.fillColor1 = '#E8D4E8';  // Warm lavender (top)
        this.fillColor2 = '#D8BCD0';  // Deeper rose-lavender (bottom)
        this.outlineColor = '#1A1520';  // Dark warm brown
        this.outlineThickness = 3;

        // Cached shape
        this.shape = null;
        this.cachedPixels = null;  // Cache rasterized result
        this.cachedOutline = null;
        this.boundsMinY = 0;
        this.boundsMaxY = 0;
    }

    // Generate irregular spikes around the perimeter
    generateShape(centerX, centerY, baseWidth, baseHeight, seed = 42) {
        const points = [];
        const numPoints = 48;  // More points for smoother perimeter
        const spikeFrequency = 0.15;  // Fewer spikes for softer feel

        // Simple seeded random
        let random = seed;
        const nextRandom = () => {
            random = (random * 1103515245 + 12345) & 0x7fffffff;
            return random / 0x7fffffff;
        };

        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;

            // Base ellipse radius
            let radiusX = baseWidth / 2;
            let radiusY = baseHeight / 2;

            // Gentle organic wobble
            const wobble = 1 + (nextRandom() - 0.5) * 0.1;

            // Subtle bumps instead of aggressive spikes
            let spike = 1;
            if (nextRandom() < spikeFrequency) {
                spike = 1 + nextRandom() * 0.12;  // Gentle outward bump
            } else if (nextRandom() < spikeFrequency) {
                spike = 1 - nextRandom() * 0.06;  // Slight inward curve
            }

            const x = centerX + Math.cos(angle) * radiusX * wobble * spike;
            const y = centerY + Math.sin(angle) * radiusY * wobble * spike;

            points.push({ x: Math.floor(x), y: Math.floor(y) });
        }

        this.shape = points;
        return points;
    }

    // Rasterize the bubble shape to a pixel array
    rasterize(width, height, centerX, centerY, bubbleWidth, bubbleHeight) {
        if (!this.shape) {
            this.generateShape(centerX, centerY, bubbleWidth, bubbleHeight);
        }

        const pixels = [];
        for (let y = 0; y < height; y++) {
            pixels[y] = [];
            for (let x = 0; x < width; x++) {
                pixels[y][x] = this.isPointInShape(x, y) ? 1 : 0;
            }
        }
        return pixels;
    }

    // Point in polygon test
    isPointInShape(x, y) {
        if (!this.shape || this.shape.length < 3) return false;

        let inside = false;
        const n = this.shape.length;

        for (let i = 0, j = n - 1; i < n; j = i++) {
            const xi = this.shape[i].x, yi = this.shape[i].y;
            const xj = this.shape[j].x, yj = this.shape[j].y;

            if (((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
                inside = !inside;
            }
        }

        return inside;
    }

    // Pre-render the bubble to cache (call once after generateShape)
    prerender(width, height) {
        if (!this.shape) return;

        this.cachedPixels = [];
        this.cachedOutline = [];
        this.boundsMinY = Infinity;
        this.boundsMaxY = -Infinity;
        const thickness = this.outlineThickness;

        // First pass: find all filled pixels and edge pixels
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (this.isPointInShape(x, y)) {
                    // Check if near edge
                    let isEdge = false;
                    for (let dy = -thickness; dy <= thickness && !isEdge; dy++) {
                        for (let dx = -thickness; dx <= thickness && !isEdge; dx++) {
                            if (dx === 0 && dy === 0) continue;
                            if (!this.isPointInShape(x + dx, y + dy)) {
                                isEdge = true;
                            }
                        }
                    }
                    if (isEdge) {
                        this.cachedOutline.push({ x, y });
                    } else {
                        this.cachedPixels.push({ x, y });
                        if (y < this.boundsMinY) this.boundsMinY = y;
                        if (y > this.boundsMaxY) this.boundsMaxY = y;
                    }
                } else {
                    // Check if near shape (for outer outline)
                    let nearShape = false;
                    for (let dy = -thickness; dy <= thickness && !nearShape; dy++) {
                        for (let dx = -thickness; dx <= thickness && !nearShape; dx++) {
                            if (this.isPointInShape(x + dx, y + dy)) {
                                nearShape = true;
                            }
                        }
                    }
                    if (nearShape) {
                        this.cachedOutline.push({ x, y });
                    }
                }
            }
        }
    }

    // Draw the bubble to the renderer (uses cached data)
    draw(renderer, centerX, centerY, bubbleWidth, bubbleHeight) {
        // Generate and cache if needed
        if (!this.shape) {
            this.generateShape(centerX, centerY, bubbleWidth, bubbleHeight);
        }
        if (!this.cachedPixels) {
            this.prerender(renderer.width, renderer.height);
        }

        // Draw cached outline first
        for (const p of this.cachedOutline) {
            renderer.setPixel(p.x, p.y, this.outlineColor);
        }

        // Draw cached fill with dithered gradient
        const range = this.boundsMaxY - this.boundsMinY;
        if (range > 0) {
            for (const p of this.cachedPixels) {
                const t = (p.y - this.boundsMinY) / range;
                const color = renderer.ditherPixel(p.x, p.y, this.fillColor1, this.fillColor2, t);
                renderer.setPixel(p.x, p.y, color);
            }
        } else {
            for (const p of this.cachedPixels) {
                renderer.setPixel(p.x, p.y, this.fillColor1);
            }
        }
    }

    // Reset shape for regeneration
    reset() {
        this.shape = null;
        this.cachedPixels = null;
        this.cachedOutline = null;
    }
}
