// "FRICTION HALL" main text - editorial pixel letters with improved readability
// Thick vertical strokes (3px), medium horizontal strokes (2px)
// Didot-inspired contrast with bolder thin strokes for legibility
// Warm coral-to-gold gradient with ordered dithering

// Each letter defined as a 2D pixel array
// Large F and H: 20 pixels tall, 11 wide
// Standard letters: 16 pixels tall, 7-11 wide

const LETTERS = {
    // Large F (11x20) - bold top bar, clear crossbar, small foot (NOT an E)
    'F_LARGE': [
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,1,1,1,1,0,0],
        [0,0,1,1,1,1,1,1,1,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,1,1,1,1,1,0,0,0,0,0],
    ],

    // Large H (11x20) - serifs, bold crossbar
    'H_LARGE': [
        [1,1,1,1,1,0,1,1,1,1,1],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [1,1,1,1,1,0,1,1,1,1,1],
    ],

    // R (9x16) - clear bowl, prominent leg
    'R': [
        [1,1,1,1,1,1,1,0,0],
        [0,1,1,1,0,0,1,1,0],
        [0,1,1,1,0,0,0,1,1],
        [0,1,1,1,0,0,0,1,1],
        [0,1,1,1,0,0,0,1,1],
        [0,1,1,1,0,0,1,1,0],
        [0,1,1,1,1,1,1,0,0],
        [0,1,1,1,1,1,0,0,0],
        [0,1,1,1,0,1,1,0,0],
        [0,1,1,1,0,0,1,1,0],
        [0,1,1,1,0,0,1,1,0],
        [0,1,1,1,0,0,0,1,1],
        [0,1,1,1,0,0,0,1,1],
        [0,1,1,1,0,0,0,0,1],
        [0,1,1,1,0,0,0,0,1],
        [1,1,1,1,1,0,0,1,1],
    ],

    // I (7x16) - bold serifs for clear recognition
    'I': [
        [1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1],
    ],

    // C (9x16) - bold curves, clear opening
    'C': [
        [0,0,0,1,1,1,1,0,0],
        [0,0,1,1,1,1,1,1,0],
        [0,1,1,1,0,0,0,1,1],
        [1,1,1,0,0,0,0,0,0],
        [1,1,1,0,0,0,0,0,0],
        [1,1,1,0,0,0,0,0,0],
        [1,1,1,0,0,0,0,0,0],
        [1,1,1,0,0,0,0,0,0],
        [1,1,1,0,0,0,0,0,0],
        [1,1,1,0,0,0,0,0,0],
        [1,1,1,0,0,0,0,0,0],
        [1,1,1,0,0,0,0,0,0],
        [1,1,1,0,0,0,0,0,0],
        [0,1,1,1,0,0,0,1,1],
        [0,0,1,1,1,1,1,1,0],
        [0,0,0,1,1,1,1,0,0],
    ],

    // T (9x16) - bold top bar, bold foot
    'T': [
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,0],
    ],

    // O (9x16) - bolder top/bottom curves
    'O': [
        [0,0,0,1,1,1,0,0,0],
        [0,0,1,1,1,1,1,0,0],
        [0,1,1,0,0,0,1,1,0],
        [1,1,1,0,0,0,1,1,1],
        [1,1,1,0,0,0,1,1,1],
        [1,1,1,0,0,0,1,1,1],
        [1,1,1,0,0,0,1,1,1],
        [1,1,1,0,0,0,1,1,1],
        [1,1,1,0,0,0,1,1,1],
        [1,1,1,0,0,0,1,1,1],
        [1,1,1,0,0,0,1,1,1],
        [1,1,1,0,0,0,1,1,1],
        [1,1,1,0,0,0,1,1,1],
        [0,1,1,0,0,0,1,1,0],
        [0,0,1,1,1,1,1,0,0],
        [0,0,0,1,1,1,0,0,0],
    ],

    // N (10x16) - thick stems, full-height thin diagonal
    'N': [
        [1,1,1,1,0,0,0,1,1,1],
        [1,1,1,1,0,0,0,1,1,1],
        [1,1,1,1,0,0,0,1,1,1],
        [1,1,1,1,1,0,0,1,1,1],
        [1,1,1,0,1,0,0,1,1,1],
        [1,1,1,0,1,0,0,1,1,1],
        [1,1,1,0,1,0,0,1,1,1],
        [1,1,1,0,1,1,0,1,1,1],
        [1,1,1,0,0,1,0,1,1,1],
        [1,1,1,0,0,1,0,1,1,1],
        [1,1,1,0,0,1,0,1,1,1],
        [1,1,1,0,0,1,1,1,1,1],
        [1,1,1,0,0,0,1,1,1,1],
        [1,1,1,0,0,0,1,1,1,1],
        [1,1,1,0,0,0,1,1,1,1],
        [1,1,1,0,0,0,1,1,1,1],
    ],

    // A (10x16) - thin peak, bold crossbar
    'A': [
        [0,0,0,0,1,1,0,0,0,0],
        [0,0,0,1,1,1,1,0,0,0],
        [0,0,1,1,0,0,1,1,0,0],
        [0,0,1,1,0,0,1,1,0,0],
        [0,1,1,1,0,0,1,1,1,0],
        [0,1,1,0,0,0,0,1,1,0],
        [1,1,1,0,0,0,0,1,1,1],
        [1,1,1,0,0,0,0,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,0,0,0,0,1,1,1],
        [1,1,1,0,0,0,0,1,1,1],
        [1,1,1,0,0,0,0,1,1,1],
        [1,1,1,0,0,0,0,1,1,1],
        [1,1,1,0,0,0,0,1,1,1],
        [1,1,1,1,0,0,1,1,1,1],
    ],

    // L (9x16) - bold top serif, bold base bar
    'L': [
        [1,1,1,1,1,0,0,0,0],
        [1,1,1,1,1,0,0,0,0],
        [0,1,1,1,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
    ],

    // H (11x16) - symmetric serifs, bold crossbar
    'H': [
        [1,1,1,1,1,0,1,1,1,1,1],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,1,1,0,0,0,1,1,1,0],
        [1,1,1,1,1,0,1,1,1,1,1],
    ],
};

// Height constants for layout
const LARGE_HEIGHT = 20;
const STANDARD_HEIGHT = 16;

export class FrictionHallText {
    constructor() {
        this.color1 = '#D98070';  // Warm coral
        this.color2 = '#F0C878';  // Soft gold
        this.outlineColor = '#1A1520';  // Dark warm brown
        this.outlineThickness = 2;  // Thick outline for readability

        // Letter spacing
        this.letterSpacing = 3;
        this.lineSpacing = 7;  // Space between FRICTION and HALL

        // Wobble for fun baseline (gentle)
        this.wobbleAmplitude = 0.5;
        this.wobbleFrequency = 0.4;
    }

    // Get letter data with size info (auto-detected from pixel array)
    getLetterData(char, isLarge = false) {
        let key = char;
        if ((char === 'F' || char === 'H') && isLarge) key = char + '_LARGE';
        if (LETTERS[key]) {
            return {
                pixels: LETTERS[key],
                width: LETTERS[key][0].length,
                height: LETTERS[key].length
            };
        }
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
            height: LARGE_HEIGHT + this.lineSpacing + LARGE_HEIGHT,
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

        // Center each word horizontally
        const frictionX = Math.floor(centerX - dims.frictionWidth / 2);
        const hallX = Math.floor(centerX - dims.hallWidth / 2);

        // Stack vertically, centered around centerY
        const totalHeight = dims.height;
        const frictionY = Math.floor(centerY - totalHeight / 2);
        const hallY = Math.floor(frictionY + LARGE_HEIGHT + this.lineSpacing);

        this.drawWord(renderer, friction, frictionX, frictionY, time, 0, true);
        this.drawWord(renderer, hall, hallX, hallY, time, friction.length, true);
    }

    getHeight() {
        return this.getDimensions().height;
    }

    getWidth() {
        return this.getDimensions().width;
    }
}
