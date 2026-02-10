// Glitch effects - RGB split, corruption, artifacts

export class GlitchEffect {
    constructor() {
        this.intensity = 0;
        this.rgbOffset = 3;
        this.corruptionChance = 0.1;
        this.sliceChance = 0.3;
    }

    // Apply all glitch effects based on intensity
    apply(renderer, intensity = 0.5) {
        this.intensity = intensity;

        if (intensity <= 0) return;

        const imageData = renderer.getImageData();

        // RGB channel splitting
        if (intensity > 0.2) {
            this.applyRGBSplit(imageData, Math.floor(this.rgbOffset * intensity));
        }

        // Horizontal slice displacement
        if (intensity > 0.3 && Math.random() < this.sliceChance * intensity) {
            this.applySliceDisplacement(imageData);
        }

        // Random pixel corruption
        if (intensity > 0.1) {
            this.applyCorruption(imageData, this.corruptionChance * intensity);
        }

        renderer.putImageData(imageData);
    }

    // RGB channel offset (chromatic aberration)
    applyRGBSplit(imageData, offset) {
        const { data, width, height } = imageData;
        const copy = new Uint8ClampedArray(data);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 4;

                // Offset red channel left
                const redX = Math.max(0, x - offset);
                const redI = (y * width + redX) * 4;
                data[i] = copy[redI];

                // Keep green in place
                data[i + 1] = copy[i + 1];

                // Offset blue channel right
                const blueX = Math.min(width - 1, x + offset);
                const blueI = (y * width + blueX) * 4;
                data[i + 2] = copy[blueI + 2];
            }
        }
    }

    // Horizontal slice displacement
    applySliceDisplacement(imageData) {
        const { data, width, height } = imageData;
        const copy = new Uint8ClampedArray(data);

        // Random number of slices
        const numSlices = Math.floor(Math.random() * 5) + 2;

        for (let s = 0; s < numSlices; s++) {
            const sliceY = Math.floor(Math.random() * height);
            const sliceHeight = Math.floor(Math.random() * 8) + 2;
            const offset = Math.floor((Math.random() - 0.5) * 20);

            for (let y = sliceY; y < Math.min(height, sliceY + sliceHeight); y++) {
                for (let x = 0; x < width; x++) {
                    const srcX = Math.max(0, Math.min(width - 1, x - offset));
                    const dstI = (y * width + x) * 4;
                    const srcI = (y * width + srcX) * 4;

                    data[dstI] = copy[srcI];
                    data[dstI + 1] = copy[srcI + 1];
                    data[dstI + 2] = copy[srcI + 2];
                    data[dstI + 3] = copy[srcI + 3];
                }
            }
        }
    }

    // Random pixel corruption
    applyCorruption(imageData, chance) {
        const { data, width, height } = imageData;

        for (let i = 0; i < data.length; i += 4) {
            if (Math.random() < chance * 0.01) {
                // Corrupt this pixel
                const type = Math.floor(Math.random() * 4);
                switch (type) {
                    case 0: // Invert
                        data[i] = 255 - data[i];
                        data[i + 1] = 255 - data[i + 1];
                        data[i + 2] = 255 - data[i + 2];
                        break;
                    case 1: // White
                        data[i] = data[i + 1] = data[i + 2] = 255;
                        break;
                    case 2: // Random color
                        data[i] = Math.floor(Math.random() * 256);
                        data[i + 1] = Math.floor(Math.random() * 256);
                        data[i + 2] = Math.floor(Math.random() * 256);
                        break;
                    case 3: // Black
                        data[i] = data[i + 1] = data[i + 2] = 0;
                        break;
                }
            }
        }
    }

    // Draw random glitch artifacts (blocks, lines)
    drawArtifacts(renderer, intensity) {
        if (intensity <= 0) return;

        const { width, height } = renderer;
        const numArtifacts = Math.floor(intensity * 10);

        for (let i = 0; i < numArtifacts; i++) {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);
            const w = Math.floor(Math.random() * 30) + 5;
            const h = Math.floor(Math.random() * 5) + 1;

            const colors = ['#FF6B35', '#FFD93D', '#39FF14', '#00CED1', '#D8BFD8', '#fff', '#000'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            renderer.fillRect(x, y, w, h, color);
        }
    }

    // Brief flash of the final image (corrupted)
    flashPreview(renderer, drawCallback, intensity) {
        if (Math.random() > intensity * 0.3) return;

        // Draw the actual content briefly
        drawCallback();

        // Apply heavy corruption
        this.apply(renderer, 0.8);

        // Random colored overlay bars
        const { width, height } = renderer;
        for (let i = 0; i < 3; i++) {
            const y = Math.floor(Math.random() * height);
            const h = Math.floor(Math.random() * 10) + 2;
            const colors = ['#FF6B35', '#39FF14', '#00CED1'];
            renderer.fillRect(0, y, width, h, colors[i % colors.length]);
        }
    }
}
