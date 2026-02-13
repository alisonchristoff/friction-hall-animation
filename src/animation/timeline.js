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
            entry: { start: 0, end: 1.8 },
            hold: { start: 1.8, end: 3.2 },
            exit: { start: 3.2, end: 5.5 }
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

// Pre-configured timeline for Friction Hall intro (5.5 seconds)
// Entry: Swoop in from background (tiny → full, swervy arc from upper-left)
// Hold: Confident display with subtle effects
// Exit: Shake then roll out to the right
export function createFrictionHallTimeline() {
    const timeline = new Timeline(30, 5.5);

    // ===== ENTRY: Swoop in from background (0-1.8s) =====

    // Scale: starts tiny (far away), grows to full with slight overshoot
    timeline.addKeyframeAt('scale', 0, 0.05);
    timeline.addKeyframeAt('scale', 0.8, 0.5, Easing.easeOutCubic);
    timeline.addKeyframeAt('scale', 1.5, 1.03, Easing.easeOutCubic);
    timeline.addKeyframeAt('scale', 1.8, 1.0, Easing.easeOutCubic);

    // Horizontal: swervy path from upper-left
    timeline.addKeyframeAt('offsetX', 0, -180);
    timeline.addKeyframeAt('offsetX', 0.6, -60, Easing.easeOutCubic);
    timeline.addKeyframeAt('offsetX', 1.2, 15, Easing.easeInOut);       // overshoot right
    timeline.addKeyframeAt('offsetX', 1.8, 0, Easing.easeOutCubic);     // settle center

    // Vertical: arc from above
    timeline.addKeyframeAt('offsetY', 0, -120);
    timeline.addKeyframeAt('offsetY', 0.6, -30, Easing.easeOutCubic);
    timeline.addKeyframeAt('offsetY', 1.2, 8, Easing.easeInOut);        // overshoot below
    timeline.addKeyframeAt('offsetY', 1.8, 0, Easing.easeOutCubic);     // settle center

    // Rotation: flat during entry
    timeline.addKeyframeAt('rotation', 0, -0.15);                       // slight tilt during flight
    timeline.addKeyframeAt('rotation', 1.5, 0.02, Easing.easeOutCubic);
    timeline.addKeyframeAt('rotation', 1.8, 0, Easing.easeOutCubic);

    // Visibility: always visible (position/scale handles screen presence)
    timeline.addKeyframeAt('visibility', 0, 1);

    // ===== HOLD: Confident display (1.8-3.2s) =====

    timeline.addKeyframeAt('offsetX', 3.2, 0);
    timeline.addKeyframeAt('offsetY', 3.2, 0);
    timeline.addKeyframeAt('scale', 3.2, 1.0);
    timeline.addKeyframeAt('rotation', 3.2, 0);

    // ===== EXIT: Shake then roll out right (3.2-5.5s) =====

    // Shake builds up before the roll
    timeline.addKeyframeAt('shake', 0, 0);
    timeline.addKeyframeAt('shake', 1.4, 0);
    timeline.addKeyframeAt('shake', 1.6, 1.5, Easing.easeOut);     // soft landing thump
    timeline.addKeyframeAt('shake', 2.0, 0, Easing.easeOut);
    timeline.addKeyframeAt('shake', 3.2, 0);
    timeline.addKeyframeAt('shake', 3.4, 3, Easing.easeIn);        // wind-up shake
    timeline.addKeyframeAt('shake', 3.6, 1);
    timeline.addKeyframeAt('shake', 3.8, 0);

    // Roll out: rotation (2 full spins)
    timeline.addKeyframeAt('rotation', 3.5, 0);
    timeline.addKeyframeAt('rotation', 5.3, Math.PI * 4, Easing.easeInCubic);

    // Fly off to the right
    timeline.addKeyframeAt('offsetX', 3.5, 0);
    timeline.addKeyframeAt('offsetX', 5.3, 500, Easing.easeInCubic);

    // Slight upward arc during exit
    timeline.addKeyframeAt('offsetY', 3.5, 0);
    timeline.addKeyframeAt('offsetY', 4.2, -15, Easing.easeInOut);
    timeline.addKeyframeAt('offsetY', 5.3, -40, Easing.easeInCubic);

    // Slight shrink as it rolls away
    timeline.addKeyframeAt('scale', 3.5, 1.0);
    timeline.addKeyframeAt('scale', 5.3, 0.7, Easing.easeInCubic);

    // Visibility fades at very end
    timeline.addKeyframeAt('visibility', 5.0, 1);
    timeline.addKeyframeAt('visibility', 5.5, 0, Easing.easeIn);

    // ===== EFFECTS =====

    // Subtle glitch: brief pulse on landing + pre-exit
    timeline.addKeyframeAt('glitchIntensity', 0, 0);
    timeline.addKeyframeAt('glitchIntensity', 1.5, 0);
    timeline.addKeyframeAt('glitchIntensity', 1.7, 0.15, Easing.easeOut);
    timeline.addKeyframeAt('glitchIntensity', 2.0, 0, Easing.easeOut);
    timeline.addKeyframeAt('glitchIntensity', 3.2, 0);
    timeline.addKeyframeAt('glitchIntensity', 3.4, 0.1, Easing.easeOut);
    timeline.addKeyframeAt('glitchIntensity', 3.6, 0, Easing.easeOut);

    // Subtle scanlines during hold
    timeline.addKeyframeAt('scanlines', 0, 0);
    timeline.addKeyframeAt('scanlines', 2.0, 0);
    timeline.addKeyframeAt('scanlines', 2.3, 0.06, Easing.easeOut);
    timeline.addKeyframeAt('scanlines', 3.0, 0.06);
    timeline.addKeyframeAt('scanlines', 3.2, 0, Easing.easeIn);

    // Gentle breathing pulse during hold
    timeline.addKeyframeAt('pulse', 0, 1);
    timeline.addKeyframeAt('pulse', 2.0, 1);
    timeline.addKeyframeAt('pulse', 2.7, 1.01);
    timeline.addKeyframeAt('pulse', 3.2, 1);

    return timeline;
}
