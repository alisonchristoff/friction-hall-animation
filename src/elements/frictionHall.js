// "FRICTION HALL" main text - tall confident bubble pixel letters
// F and H are larger than other letters
// Warm coral-to-gold gradient with ordered dithering

// Each letter defined as a 2D pixel array
// Standard letters: 12 pixels tall, 7-8 wide (tall proportions)
// Large F and H: 16 pixels tall, 10 wide

const LETTERS = {
    // Large F (10x16) - tall, rounded, confident
    'F_LARGE': [
        [0,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,0,0,0],
        [1,1,1,1,1,1,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0],
        [0,1,1,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,0,0,0],
    ],

    // Large H (10x16) - tall, rounded, balanced
    'H_LARGE': [
        [0,1,0,0,0,0,0,0,1,0],
        [1,1,0,0,0,0,0,0,1,1],
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
        [0,1,0,0,0,0,0,0,1,0],
    ],

    // R (7x12) - tall, round bowl
    'R': [
        [0,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,1,1,0],
        [1,1,1,1,1,0,0],
        [1,1,1,1,0,0,0],
        [1,1,0,1,1,0,0],
        [1,1,0,0,1,1,0],
        [1,1,0,0,1,1,0],
        [1,1,0,0,0,1,1],
        [0,1,0,0,0,0,1],
    ],

    // I (4x12) - tall, balanced width
    'I': [
        [0,1,1,0],
        [1,1,1,1],
        [0,1,1,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,1,1,0],
        [1,1,1,1],
        [0,1,1,0],
    ],

    // C (7x12) - tall, round
    'C': [
        [0,0,1,1,1,0,0],
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0],
        [0,0,1,1,1,0,0],
    ],

    // T (8x12) - tall, centered 2px stem
    'T': [
        [0,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1],
        [0,0,0,1,1,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,1,1,0,0,0],
    ],

    // O (7x12) - tall, round
    'O': [
        [0,0,1,1,1,0,0],
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0],
        [0,0,1,1,1,0,0],
    ],

    // N (7x12) - tall, clean diagonal
    'N': [
        [0,1,0,0,0,1,0],
        [1,1,0,0,0,1,1],
        [1,1,1,0,0,1,1],
        [1,1,1,0,0,1,1],
        [1,1,1,1,0,1,1],
        [1,1,0,1,0,1,1],
        [1,1,0,1,1,1,1],
        [1,1,0,0,1,1,1],
        [1,1,0,0,1,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,0,0,0,1,0],
    ],

    // A (7x12) - tall, pointed top
    'A': [
        [0,0,1,1,1,0,0],
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,0,0,0,1,0],
    ],

    // L (7x12) - tall, rounded
    'L': [
        [0,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,1,1,1,1,1],
        [0,1,1,1,1,1,0],
    ],

    // H (7x12) - standard size, tall
    'H': [
        [0,1,0,0,0,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,0,0,0,1,0],
    ],
};

// Height constants for layout
const LARGE_HEIGHT = 16;
const STANDARD_HEIGHT = 12;

export class FrictionHallText {
    constructor() {
        this.color1 = '#D98070';  // Warm coral
        this.color2 = '#F0C878';  // Soft gold
        this.outlineColor = '#1A1520';  // Dark warm brown
        this.outlineThickness = 2;

        // Letter spacing
        this.letterSpacing = 2;
        this.lineSpacing = 5;  // Space between FRICTION and HALL

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
