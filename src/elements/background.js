// 90s geometric repeating pattern background

export class Background {
    constructor() {
        this.baseColor = '#2D1B69';     // Dark purple
        this.accentColor1 = '#FF6B35';  // Orange
        this.accentColor2 = '#00CED1';  // Teal

        this.patternSize = 16;  // Pattern tile size
    }

    // Draw the 90s pattern
    draw(renderer) {
        const { width, height } = renderer;

        // Fill base color
        renderer.fillRect(0, 0, width, height, this.baseColor);

        // Draw pattern tiles
        for (let ty = 0; ty < Math.ceil(height / this.patternSize); ty++) {
            for (let tx = 0; tx < Math.ceil(width / this.patternSize); tx++) {
                this.drawTile(renderer, tx * this.patternSize, ty * this.patternSize, tx, ty);
            }
        }
    }

    // Draw a single pattern tile
    drawTile(renderer, x, y, tx, ty) {
        const size = this.patternSize;
        const alternate = (tx + ty) % 2 === 0;

        // Zigzag pattern
        if (alternate) {
            // Draw diagonal lines (teal)
            for (let i = 0; i < size; i += 4) {
                // Top-left to bottom-right diagonal
                renderer.setPixel(x + i, y + i, this.accentColor2);
                renderer.setPixel(x + i + 1, y + i, this.accentColor2);
                if (i + 1 < size) {
                    renderer.setPixel(x + i, y + i + 1, this.accentColor2);
                }
            }
        } else {
            // Draw triangles (orange)
            const midX = x + size / 2;
            const midY = y + size / 2;

            // Small triangle pointing up
            for (let row = 0; row < 4; row++) {
                const width = row + 1;
                for (let col = 0; col < width; col++) {
                    renderer.setPixel(midX - Math.floor(width / 2) + col, y + 2 + row, this.accentColor1);
                }
            }
        }

        // Occasional dots
        if ((tx * 7 + ty * 13) % 5 === 0) {
            renderer.setPixel(x + 2, y + 2, this.accentColor1);
            renderer.setPixel(x + 3, y + 2, this.accentColor1);
            renderer.setPixel(x + 2, y + 3, this.accentColor1);
            renderer.setPixel(x + 3, y + 3, this.accentColor1);
        }

        // Grid lines for that 90s Memphis look
        if (ty % 3 === 0) {
            for (let i = 0; i < size; i += 2) {
                renderer.setPixel(x + i, y, this.accentColor2);
            }
        }

        if (tx % 4 === 0) {
            for (let i = 0; i < size; i += 3) {
                renderer.setPixel(x, y + i, this.accentColor1);
            }
        }
    }

    // Draw a simpler version for performance
    drawSimple(renderer) {
        const { width, height } = renderer;

        // Fill base color
        renderer.fillRect(0, 0, width, height, this.baseColor);

        // Diagonal stripes
        for (let i = -height; i < width + height; i += 8) {
            for (let j = 0; j < height; j++) {
                const x = i + j;
                if (x >= 0 && x < width) {
                    const color = Math.floor(i / 8) % 2 === 0 ? this.accentColor1 : this.accentColor2;
                    if (j % 4 === 0) {
                        renderer.setPixel(x, j, color);
                    }
                }
            }
        }

        // Scattered geometric shapes
        for (let i = 0; i < 20; i++) {
            const px = (i * 37 + 13) % width;
            const py = (i * 23 + 7) % height;
            const size = 2 + (i % 3);
            const color = i % 2 === 0 ? this.accentColor1 : this.accentColor2;

            if (i % 3 === 0) {
                // Diamond
                renderer.setPixel(px, py - 1, color);
                renderer.setPixel(px - 1, py, color);
                renderer.setPixel(px + 1, py, color);
                renderer.setPixel(px, py + 1, color);
            } else if (i % 3 === 1) {
                // Square
                renderer.fillRect(px, py, size, size, color);
            } else {
                // Cross
                renderer.fillRect(px - 1, py, 3, 1, color);
                renderer.fillRect(px, py - 1, 1, 3, color);
            }
        }
    }
}
