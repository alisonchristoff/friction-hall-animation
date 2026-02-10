// "WE MEAN BUSINESS." subtext - blocky green pixel font

// Small 5x7 pixel font for subtext
const SMALL_LETTERS = {
    'W': [
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,1,0,1],
        [1,0,1,0,1],
        [1,1,0,1,1],
        [1,0,0,0,1],
    ],
    'E': [
        [1,1,1,1,1],
        [1,0,0,0,0],
        [1,0,0,0,0],
        [1,1,1,1,0],
        [1,0,0,0,0],
        [1,0,0,0,0],
        [1,1,1,1,1],
    ],
    'M': [
        [1,0,0,0,1],
        [1,1,0,1,1],
        [1,0,1,0,1],
        [1,0,1,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
    ],
    'A': [
        [0,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,1,1,1,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
    ],
    'N': [
        [1,0,0,0,1],
        [1,1,0,0,1],
        [1,0,1,0,1],
        [1,0,1,0,1],
        [1,0,0,1,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
    ],
    'B': [
        [1,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,1,1,1,0],
    ],
    'U': [
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,1,1,1,0],
    ],
    'S': [
        [0,1,1,1,1],
        [1,0,0,0,0],
        [1,0,0,0,0],
        [0,1,1,1,0],
        [0,0,0,0,1],
        [0,0,0,0,1],
        [1,1,1,1,0],
    ],
    'I': [
        [1,1,1],
        [0,1,0],
        [0,1,0],
        [0,1,0],
        [0,1,0],
        [0,1,0],
        [1,1,1],
    ],
    '.': [
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [1],
    ],
    ' ': [
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ],
};

export class SubText {
    constructor() {
        this.color = '#39FF14';  // Retro green
        this.text = 'WE MEAN BUSINESS.';
        this.letterSpacing = 1;
    }

    // Calculate total width
    calculateWidth() {
        let width = 0;
        for (let i = 0; i < this.text.length; i++) {
            const char = this.text[i];
            const letter = SMALL_LETTERS[char];
            if (letter) {
                width += letter[0].length;
                if (i < this.text.length - 1) width += this.letterSpacing;
            }
        }
        return width;
    }

    // Draw the text
    draw(renderer, startX, startY) {
        let x = startX;

        for (const char of this.text) {
            const letter = SMALL_LETTERS[char];
            if (letter) {
                renderer.drawPixelArray(letter, x, startY, this.color);
                x += letter[0].length + this.letterSpacing;
            }
        }
    }

    getHeight() {
        return 7;
    }
}
