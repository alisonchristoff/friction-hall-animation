// Keyframe-based animation timeline system

// Easing functions
export const Easing = {
    linear: t => t,
    easeIn: t => t * t,
    easeOut: t => t * (2 - t),
    easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    bounce: t => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) {
            return n1 * t * t;
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    },
    elastic: t => {
        if (t === 0 || t === 1) return t;
        return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
    }
};

export class Timeline {
    constructor(fps = 30, totalSeconds = 8) {
        this.fps = fps;
        this.totalFrames = fps * totalSeconds;
        this.currentFrame = 0;
        this.isPlaying = false;

        // Animation phases (in seconds)
        this.phases = {
            glitchIntro: { start: 0, end: 2 },
            reveal: { start: 2, end: 4 },
            hold: { start: 4, end: 6 },
            outro: { start: 6, end: 8 }
        };

        // Keyframes for various properties
        this.keyframes = {};
    }

    // Get current time in seconds
    getCurrentTime() {
        return this.currentFrame / this.fps;
    }

    // Get current phase
    getCurrentPhase() {
        const time = this.getCurrentTime();
        for (const [name, phase] of Object.entries(this.phases)) {
            if (time >= phase.start && time < phase.end) {
                return name;
            }
        }
        return 'outro';
    }

    // Get progress within current phase (0-1)
    getPhaseProgress(phaseName) {
        const time = this.getCurrentTime();
        const phase = this.phases[phaseName];
        if (!phase) return 0;

        if (time < phase.start) return 0;
        if (time >= phase.end) return 1;

        return (time - phase.start) / (phase.end - phase.start);
    }

    // Add a keyframe
    addKeyframe(property, frame, value, easing = Easing.linear) {
        if (!this.keyframes[property]) {
            this.keyframes[property] = [];
        }
        this.keyframes[property].push({ frame, value, easing });
        this.keyframes[property].sort((a, b) => a.frame - b.frame);
    }

    // Add a keyframe by time (seconds)
    addKeyframeAt(property, time, value, easing = Easing.linear) {
        this.addKeyframe(property, Math.floor(time * this.fps), value, easing);
    }

    // Get interpolated value at current frame
    getValue(property, defaultValue = 0) {
        const keyframes = this.keyframes[property];
        if (!keyframes || keyframes.length === 0) return defaultValue;

        const frame = this.currentFrame;

        // Before first keyframe
        if (frame <= keyframes[0].frame) return keyframes[0].value;

        // After last keyframe
        if (frame >= keyframes[keyframes.length - 1].frame) {
            return keyframes[keyframes.length - 1].value;
        }

        // Find surrounding keyframes
        let prev = keyframes[0];
        let next = keyframes[1];
        for (let i = 0; i < keyframes.length - 1; i++) {
            if (frame >= keyframes[i].frame && frame < keyframes[i + 1].frame) {
                prev = keyframes[i];
                next = keyframes[i + 1];
                break;
            }
        }

        // Interpolate
        const t = (frame - prev.frame) / (next.frame - prev.frame);
        const easedT = next.easing(t);

        return prev.value + (next.value - prev.value) * easedT;
    }

    // Advance to next frame
    nextFrame() {
        this.currentFrame++;
        if (this.currentFrame >= this.totalFrames) {
            this.currentFrame = 0;  // Loop
        }
    }

    // Reset to beginning
    reset() {
        this.currentFrame = 0;
    }

    // Go to specific frame
    setFrame(frame) {
        this.currentFrame = Math.max(0, Math.min(frame, this.totalFrames - 1));
    }

    // Check if animation is complete
    isComplete() {
        return this.currentFrame >= this.totalFrames - 1;
    }

    // Play/pause control
    play() {
        this.isPlaying = true;
    }

    pause() {
        this.isPlaying = false;
    }

    toggle() {
        this.isPlaying = !this.isPlaying;
    }
}

// Pre-configured timeline for Friction Hall intro
export function createFrictionHallTimeline() {
    const timeline = new Timeline(30, 8);

    // Glitch intensity
    // Phase 1: Glitch intro (0-2s) - high glitch
    timeline.addKeyframeAt('glitchIntensity', 0, 0);
    timeline.addKeyframeAt('glitchIntensity', 0.2, 0.8, Easing.easeOut);
    timeline.addKeyframeAt('glitchIntensity', 1.5, 0.6);
    timeline.addKeyframeAt('glitchIntensity', 2, 0.9, Easing.easeIn);

    // Phase 2: Reveal (2-4s) - glitch clears
    timeline.addKeyframeAt('glitchIntensity', 2.1, 0.7);
    timeline.addKeyframeAt('glitchIntensity', 3, 0.2, Easing.easeOut);
    timeline.addKeyframeAt('glitchIntensity', 4, 0.05);

    // Phase 3: Hold (4-6s) - subtle micro-glitches
    timeline.addKeyframeAt('glitchIntensity', 4, 0.05);
    timeline.addKeyframeAt('glitchIntensity', 6, 0.05);

    // Phase 4: Outro (6-8s) - glitch burst then fade
    timeline.addKeyframeAt('glitchIntensity', 6, 0.05);
    timeline.addKeyframeAt('glitchIntensity', 6.3, 0.6, Easing.easeIn);
    timeline.addKeyframeAt('glitchIntensity', 7, 0.3);
    timeline.addKeyframeAt('glitchIntensity', 8, 0);

    // Visibility (0 = hidden, 1 = visible)
    timeline.addKeyframeAt('visibility', 0, 0);
    timeline.addKeyframeAt('visibility', 2, 0);
    timeline.addKeyframeAt('visibility', 2.1, 1, Easing.easeOut);
    timeline.addKeyframeAt('visibility', 7.5, 1);
    timeline.addKeyframeAt('visibility', 8, 0, Easing.easeIn);

    // Screen shake
    timeline.addKeyframeAt('shake', 0, 0);
    timeline.addKeyframeAt('shake', 2, 8);  // Big shake on reveal
    timeline.addKeyframeAt('shake', 2.5, 2, Easing.easeOut);
    timeline.addKeyframeAt('shake', 3, 0);
    timeline.addKeyframeAt('shake', 6.3, 5);  // Outro shake
    timeline.addKeyframeAt('shake', 7, 0, Easing.easeOut);

    // Scanline opacity
    timeline.addKeyframeAt('scanlines', 0, 0);
    timeline.addKeyframeAt('scanlines', 2, 0.5);
    timeline.addKeyframeAt('scanlines', 3, 0.2, Easing.easeOut);
    timeline.addKeyframeAt('scanlines', 6, 0.15);
    timeline.addKeyframeAt('scanlines', 8, 0);

    // Color saturation (for oversaturated reveal)
    timeline.addKeyframeAt('saturation', 0, 1);
    timeline.addKeyframeAt('saturation', 2, 1.5);
    timeline.addKeyframeAt('saturation', 3, 1, Easing.easeOut);
    timeline.addKeyframeAt('saturation', 6, 1);

    // Breathing/pulse effect
    timeline.addKeyframeAt('pulse', 0, 1);
    timeline.addKeyframeAt('pulse', 4, 1);
    timeline.addKeyframeAt('pulse', 5, 1.02);
    timeline.addKeyframeAt('pulse', 6, 1);

    return timeline;
}
