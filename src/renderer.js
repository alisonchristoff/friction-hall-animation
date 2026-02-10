// Canvas rendering utilities - pixel-perfect, no anti-aliasing

// Bayer matrix 4x4 for ordered dithering
const BAYER_4X4 = [
    [ 0,  8,  2, 10],
    [12,  4, 14,  6],
    [ 3, 11,  1,  9],
    [15,  7, 13,  5]
].map(row => row.map(v => v / 16));

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', { willReadFrequently: true });
        this.width = canvas.width;
        this.height = canvas.height;

        // Disable anti-aliasing
        this.ctx.imageSmoothingEnabled = false;
    }

    clear(color = null) {
        if (color) {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(0, 0, this.width, this.height);
        } else {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    }

    // Set a single pixel
    setPixel(x, y, color) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
    }

    // Draw a filled rectangle
    fillRect(x, y, w, h, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
    }

    // Draw a thick outline rectangle
    strokeRect(x, y, w, h, color, thickness = 1) {
        x = Math.floor(x);
        y = Math.floor(y);
        w = Math.floor(w);
        h = Math.floor(h);

        // Top
        this.fillRect(x, y, w, thickness, color);
        // Bottom
        this.fillRect(x, y + h - thickness, w, thickness, color);
        // Left
        this.fillRect(x, y, thickness, h, color);
        // Right
        this.fillRect(x + w - thickness, y, thickness, h, color);
    }

    // Parse hex color to RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    // RGB to hex
    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = Math.max(0, Math.min(255, Math.floor(x))).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    // Linear interpolation between two colors
    lerpColor(color1, color2, t) {
        const c1 = this.hexToRgb(color1);
        const c2 = this.hexToRgb(color2);
        return this.rgbToHex(
            c1.r + (c2.r - c1.r) * t,
            c1.g + (c2.g - c1.g) * t,
            c1.b + (c2.b - c1.b) * t
        );
    }

    // Ordered dithering between two colors
    ditherPixel(x, y, color1, color2, t) {
        // Floor coordinates and handle negative values with proper modulo
        x = Math.floor(x);
        y = Math.floor(y);
        const yIdx = ((y % 4) + 4) % 4;
        const xIdx = ((x % 4) + 4) % 4;
        const threshold = BAYER_4X4[yIdx][xIdx];
        return t > threshold ? color2 : color1;
    }

    // Fill rectangle with dithered gradient (vertical)
    fillGradientDithered(x, y, w, h, color1, color2) {
        for (let py = 0; py < h; py++) {
            const t = py / h;
            for (let px = 0; px < w; px++) {
                const color = this.ditherPixel(x + px, y + py, color1, color2, t);
                this.setPixel(x + px, y + py, color);
            }
        }
    }

    // Draw pixels from a 2D array (1 = filled, 0 = empty)
    drawPixelArray(arr, x, y, color, scale = 1) {
        x = Math.floor(x);
        y = Math.floor(y);

        for (let py = 0; py < arr.length; py++) {
            for (let px = 0; px < arr[py].length; px++) {
                if (arr[py][px]) {
                    this.fillRect(
                        x + px * scale,
                        y + py * scale,
                        scale,
                        scale,
                        color
                    );
                }
            }
        }
    }

    // Draw pixels with dithered gradient
    drawPixelArrayGradient(arr, x, y, color1, color2, scale = 1) {
        x = Math.floor(x);
        y = Math.floor(y);

        const height = arr.length * scale;
        for (let py = 0; py < arr.length; py++) {
            for (let px = 0; px < arr[py].length; px++) {
                if (arr[py][px]) {
                    for (let sy = 0; sy < scale; sy++) {
                        for (let sx = 0; sx < scale; sx++) {
                            const screenX = x + px * scale + sx;
                            const screenY = y + py * scale + sy;
                            const t = (py * scale + sy) / height;
                            const color = this.ditherPixel(screenX, screenY, color1, color2, t);
                            this.setPixel(screenX, screenY, color);
                        }
                    }
                }
            }
        }
    }

    // Draw thick outline around pixel array
    drawPixelArrayOutline(arr, x, y, color, scale = 1, thickness = 1) {
        x = Math.floor(x);
        y = Math.floor(y);

        const offsets = [];
        for (let t = -thickness; t <= thickness; t++) {
            for (let s = -thickness; s <= thickness; s++) {
                if (t !== 0 || s !== 0) {
                    offsets.push([t, s]);
                }
            }
        }

        for (let py = 0; py < arr.length; py++) {
            for (let px = 0; px < arr[py].length; px++) {
                if (arr[py][px]) {
                    // Check if this pixel is on an edge
                    for (const [ox, oy] of offsets) {
                        const checkX = px + ox;
                        const checkY = py + oy;
                        const isOutside = checkY < 0 || checkY >= arr.length ||
                                         checkX < 0 || checkX >= arr[checkY].length ||
                                         !arr[checkY][checkX];
                        if (isOutside) {
                            this.fillRect(
                                x + (px + ox) * scale,
                                y + (py + oy) * scale,
                                scale,
                                scale,
                                color
                            );
                        }
                    }
                }
            }
        }
    }

    // Get image data for effects
    getImageData() {
        return this.ctx.getImageData(0, 0, this.width, this.height);
    }

    // Put image data back
    putImageData(imageData) {
        this.ctx.putImageData(imageData, 0, 0);
    }

    // Export frame as data URL
    toDataURL() {
        return this.canvas.toDataURL('image/png');
    }
}
