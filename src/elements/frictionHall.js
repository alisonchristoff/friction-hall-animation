// "FRICTION HALL" main text - custom pixel bubble letters
// F and H are ~40% larger than other letters
// Orange-to-yellow sunset gradient with ordered dithering

// Each letter defined as a 2D pixel array
// Standard letters are 7 pixels wide, 9 pixels tall
// F and H are 10 pixels wide, 13 pixels tall (approximately 40% larger)

const LETTERS = {
    // Large F (10x13)
    'F_LARGE': [
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,0,0,0],
        [1,1,1,1,1,1,1,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
    ],

    // Large H (10x13)
    'H_LARGE': [
        [1,1,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,1,1],
    ],

    // Standard R (7x9)
    'R': [
        [1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,1,1,1,1,0],
        [1,1,1,1,0,0,0],
        [1,1,0,1,1,0,0],
        [1,1,0,0,1,1,0],
        [1,1,0,0,0,1,1],
    ],

    // Standard I (3x9)
    'I': [
        [1,1,1],
        [1,1,1],
        [0,1,0],
        [0,1,0],
        [0,1,0],
        [0,1,0],
        [0,1,0],
        [1,1,1],
        [1,1,1],
    ],

    // Standard C (7x9)
    'C': [
        [0,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,1,1,1,1,1],
        [0,1,1,1,1,1,0],
    ],

    // Standard T (7x9)
    'T': [
        [1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1],
        [0,0,0,1,0,0,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,0,0,0],
    ],

    // Standard O (7x9)
    'O': [
        [0,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,1,1,1,1,1],
        [0,1,1,1,1,1,0],
    ],

    // Standard N (7x9)
    'N': [
        [1,1,0,0,0,1,1],
        [1,1,1,0,0,1,1],
        [1,1,1,1,0,1,1],
        [1,1,1,1,0,1,1],
        [1,1,0,1,1,1,1],
        [1,1,0,1,1,1,1],
        [1,1,0,0,1,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
    ],

    // Standard A (7x9)
    'A': [
        [0,0,1,1,1,0,0],
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
    ],

    // Standard L (7x9)
    'L': [
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1],
    ],

    // Standard H (7x9) - for when not using large version
    'H': [
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
    ],
};

export class FrictionHallText {
    constructor() {
        this.color1 = '#FF6B35';  // Orange
        this.color2 = '#FFD93D';  // Yellow
        this.outlineColor = '#000000';
        this.outlineThickness = 2;

        // Letter spacing
        this.letterSpacing = 2;
        this.lineSpacing = 4;  // Space between FRICTION and HALL

        // Wobble for fun baseline
        this.wobbleAmplitude = 1;
        this.wobbleFrequency = 0.5;
    }

    // Get letter data with size info
    getLetterData(char, isLarge = false) {
        if (char === 'F' && isLarge) return { pixels: LETTERS['F_LARGE'], width: 10, height: 13 };
        if (char === 'H' && isLarge) return { pixels: LETTERS['H_LARGE'], width: 10, height: 13 };
        if (LETTERS[char]) return { pixels: LETTERS[char], width: LETTERS[char][0].length, height: LETTERS[char].length };
        return null;
    }

    // Calculate width of a word
    calculateWordWidth(letters, largeFirst = false) {
        let width = 0;
        letters.forEach((char, i) => {
            const isLarge = largeFirst && i === 0;
            const data = this.getLetterData(char, isLarge);
            if (data) {
                width += data.width;
                if (i < letters.length - 1) width += this.letterSpacing;
            }
        });
        return width;
    }

    // Get dimensions for layout
    getDimensions() {
        const friction = ['F', 'R', 'I', 'C', 'T', 'I', 'O', 'N'];
        const hall = ['H', 'A', 'L', 'L'];

        const frictionWidth = this.calculateWordWidth(friction, true);
        const hallWidth = this.calculateWordWidth(hall, true);

        return {
            width: Math.max(frictionWidth, hallWidth),
            height: 13 + this.lineSpacing + 13,  // Two lines of large letters
            frictionWidth,
            hallWidth
        };
    }

    // Draw a single word
    drawWord(renderer, letters, startX, startY, time, letterIndexOffset, largeFirst = false) {
        let x = Math.floor(startX);

        letters.forEach((char, i) => {
            const isLarge = largeFirst && i === 0;
            const data = this.getLetterData(char, isLarge);
            if (!data) return;

            const letterIndex = letterIndexOffset + i;
            const wobble = Math.sin(letterIndex * this.wobbleFrequency + time * 2) * this.wobbleAmplitude;
            const y = Math.floor(startY + wobble + (isLarge ? -2 : 2));

            // Draw outline first
            renderer.drawPixelArrayOutline(data.pixels, x, y, this.outlineColor, 1, this.outlineThickness);

            // Draw letter with gradient
            renderer.drawPixelArrayGradient(data.pixels, x, y, this.color1, this.color2, 1);

            x += data.width + this.letterSpacing;
        });
    }

    // Draw the full text (FRICTION stacked on HALL)
    draw(renderer, centerX, centerY, time = 0) {
        const friction = ['F', 'R', 'I', 'C', 'T', 'I', 'O', 'N'];
        const hall = ['H', 'A', 'L', 'L'];

        const dims = this.getDimensions();

        // Center each word horizontally (use floor for pixel-perfect positioning)
        const frictionX = Math.floor(centerX - dims.frictionWidth / 2);
        const hallX = Math.floor(centerX - dims.hallWidth / 2);

        // Stack vertically, centered around centerY
        const totalHeight = dims.height;
        const frictionY = Math.floor(centerY - totalHeight / 2);
        const hallY = Math.floor(frictionY + 13 + this.lineSpacing);

        this.drawWord(renderer, friction, frictionX, frictionY, time, 0, true);
        this.drawWord(renderer, hall, hallX, hallY, time, friction.length, true);
    }

    // Get the height (for positioning)
    getHeight() {
        return this.getDimensions().height;
    }

    // Get the width (for positioning)
    getWidth() {
        return this.getDimensions().width;
    }
}
