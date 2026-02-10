// CRT scanline overlay effect

export class ScanlinesEffect {
    constructor() {
        this.opacity = 0.3;
        this.lineSpacing = 2;  // Every N lines
        this.flickerSpeed = 0.1;
    }

    // Apply scanline overlay
    apply(renderer, opacity = null, time = 0) {
        const finalOpacity = opacity !== null ? opacity : this.opacity;
        if (finalOpacity <= 0) return;

        const imageData = renderer.getImageData();
        const { data, width, height } = imageData;

        // Slight flicker
        const flicker = 1 - Math.sin(time * 60) * 0.02;

        for (let y = 0; y < height; y++) {
            // Scanline on every other row (or every N rows)
            const isScanline = y % this.lineSpacing === 0;

            if (isScanline) {
                for (let x = 0; x < width; x++) {
                    const i = (y * width + x) * 4;

                    // Only affect non-transparent pixels
                    if (data[i + 3] > 0) {
                        // Darken for scanline effect
                        const factor = 1 - (finalOpacity * flicker);
                        data[i] = Math.floor(data[i] * factor);
                        data[i + 1] = Math.floor(data[i + 1] * factor);
                        data[i + 2] = Math.floor(data[i + 2] * factor);
                    }
                }
            }
        }

        renderer.putImageData(imageData);
    }

    // Draw a moving scanline (like a CRT refresh)
    drawMovingScanline(renderer, position, thickness = 2, brightness = 0.2) {
        const { width, height } = renderer;
        const y = Math.floor(position % height);

        const imageData = renderer.getImageData();
        const { data } = imageData;

        for (let dy = 0; dy < thickness; dy++) {
            const scanY = (y + dy) % height;
            for (let x = 0; x < width; x++) {
                const i = (scanY * width + x) * 4;

                if (data[i + 3] > 0) {
                    // Brighten for scan effect
                    data[i] = Math.min(255, data[i] + 255 * brightness);
                    data[i + 1] = Math.min(255, data[i + 1] + 255 * brightness);
                    data[i + 2] = Math.min(255, data[i + 2] + 255 * brightness);
                }
            }
        }

        renderer.putImageData(imageData);
    }

    // Phosphor glow effect (slight color bleeding)
    applyPhosphorGlow(renderer, intensity = 0.1) {
        if (intensity <= 0) return;

        const imageData = renderer.getImageData();
        const { data, width, height } = imageData;
        const copy = new Uint8ClampedArray(data);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 4;

                if (data[i + 3] > 0) {
                    // Add slight glow from neighboring pixels
                    let glowR = 0, glowG = 0, glowB = 0, count = 0;

                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            if (dx === 0 && dy === 0) continue;
                            const nx = x + dx;
                            const ny = y + dy;
                            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                                const ni = (ny * width + nx) * 4;
                                if (copy[ni + 3] > 0) {
                                    glowR += copy[ni];
                                    glowG += copy[ni + 1];
                                    glowB += copy[ni + 2];
                                    count++;
                                }
                            }
                        }
                    }

                    if (count > 0) {
                        data[i] = Math.min(255, data[i] + (glowR / count) * intensity);
                        data[i + 1] = Math.min(255, data[i + 1] + (glowG / count) * intensity);
                        data[i + 2] = Math.min(255, data[i + 2] + (glowB / count) * intensity);
                    }
                }
            }
        }

        renderer.putImageData(imageData);
    }
}
