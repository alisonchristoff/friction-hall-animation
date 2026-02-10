// Screen shake effect

export class ShakeEffect {
    constructor() {
        this.offsetX = 0;
        this.offsetY = 0;
        this.decay = 0.9;  // How quickly shake diminishes
        this.intensity = 0;
    }

    // Trigger a shake
    trigger(intensity = 5) {
        this.intensity = intensity;
    }

    // Update shake (call each frame)
    update() {
        if (this.intensity > 0.1) {
            this.offsetX = (Math.random() - 0.5) * this.intensity * 2;
            this.offsetY = (Math.random() - 0.5) * this.intensity * 2;
            this.intensity *= this.decay;
        } else {
            this.offsetX = 0;
            this.offsetY = 0;
            this.intensity = 0;
        }

        return { x: Math.floor(this.offsetX), y: Math.floor(this.offsetY) };
    }

    // Apply shake offset to canvas context
    applyToContext(ctx) {
        const offset = this.update();
        ctx.setTransform(1, 0, 0, 1, offset.x, offset.y);
    }

    // Reset transform
    resetContext(ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    // Get current offset (for manual application)
    getOffset() {
        return { x: Math.floor(this.offsetX), y: Math.floor(this.offsetY) };
    }

    // Set intensity directly (for animation timeline)
    setIntensity(value) {
        this.intensity = value;
    }

    // Check if currently shaking
    isActive() {
        return this.intensity > 0.1;
    }
}
