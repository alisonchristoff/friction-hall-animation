// Main entry point - Friction Hall Pixel Art Intro Animation

import { Renderer } from './renderer.js';
import { SpeechBubble } from './elements/speechBubble.js';
import { FrictionHallText } from './elements/frictionHall.js';
import { Background } from './elements/background.js';
import { GlitchEffect } from './effects/glitch.js';
import { ScanlinesEffect } from './effects/scanlines.js';
import { ShakeEffect } from './effects/shake.js';
import { createFrictionHallTimeline } from './animation/timeline.js';
import { Capturer } from './export/capturer.js';

// Configuration
const CONFIG = {
    width: 320,
    height: 180,
    fps: 30,
    duration: 5.5,  // seconds
};

// Initialize
const canvas = document.getElementById('canvas');
canvas.width = CONFIG.width;
canvas.height = CONFIG.height;

// Scale canvas for display
canvas.style.width = `${CONFIG.width * 6}px`;
canvas.style.height = `${CONFIG.height * 6}px`;

const renderer = new Renderer(canvas);

// Offscreen canvas for content rendering (transforms applied when compositing)
const offscreenCanvas = document.createElement('canvas');
offscreenCanvas.width = CONFIG.width;
offscreenCanvas.height = CONFIG.height;
const offscreenRenderer = new Renderer(offscreenCanvas);

// Create elements
const speechBubble = new SpeechBubble();
const frictionHallText = new FrictionHallText();
const background = new Background();

// Create effects
const glitchEffect = new GlitchEffect();
const scanlinesEffect = new ScanlinesEffect();
const shakeEffect = new ShakeEffect();

// Create timeline
const timeline = createFrictionHallTimeline();

// Create capturer
const capturer = new Capturer(canvas, CONFIG.fps, CONFIG.duration);

// State
let isTransparentBackground = true;
let animationId = null;
let lastTime = 0;
const frameInterval = 1000 / CONFIG.fps;

// Calculate layout positions
function getLayout() {
    const textDims = frictionHallText.getDimensions();

    // Bubble dimensions (slightly larger than content)
    const bubbleWidth = textDims.width + 40;
    const bubbleHeight = textDims.height + 30;

    // Center everything
    const centerX = CONFIG.width / 2;
    const centerY = CONFIG.height / 2;

    return {
        bubble: { centerX, centerY, width: bubbleWidth, height: bubbleHeight },
        text: { centerX, centerY }
    };
}

const layout = getLayout();
console.log('Layout:', layout);
console.log('Text dimensions:', frictionHallText.getDimensions());

// Generate speech bubble shape once
speechBubble.reset();  // Clear any cached data
speechBubble.generateShape(
    layout.bubble.centerX,
    layout.bubble.centerY,
    layout.bubble.width,
    layout.bubble.height,
    42  // seed
);
console.log('Speech bubble generated');

// Draw the main content to the offscreen renderer at full size
function drawContent(time, visibility = 1) {
    if (visibility <= 0) return;

    // Draw speech bubble
    speechBubble.draw(offscreenRenderer, layout.bubble.centerX, layout.bubble.centerY, layout.bubble.width, layout.bubble.height);

    // Draw main text (FRICTION stacked on HALL)
    frictionHallText.draw(offscreenRenderer, layout.text.centerX, layout.text.centerY, time);
}

// Draw a single frame
function drawFrame(time) {
    // Clear main canvas
    renderer.clear();

    // Draw background if not transparent mode
    if (!isTransparentBackground) {
        background.draw(renderer);
    }

    // Get animation values from timeline
    const glitchIntensity = timeline.getValue('glitchIntensity', 0);
    const visibility = timeline.getValue('visibility', 0);
    const shakeIntensity = timeline.getValue('shake', 0);
    const scanlineOpacity = timeline.getValue('scanlines', 0);
    const offsetX = timeline.getValue('offsetX', 0);
    const offsetY = timeline.getValue('offsetY', 0);
    const scale = timeline.getValue('scale', 1);
    const rotation = timeline.getValue('rotation', 0);

    // Debug: log transform values every 30 frames
    if (timeline.currentFrame % 30 === 0) {
        console.log(`Frame ${timeline.currentFrame}: scale=${scale.toFixed(3)}, rotation=${rotation.toFixed(3)}, offsetX=${offsetX.toFixed(1)}, offsetY=${offsetY.toFixed(1)}, visibility=${visibility}`);
    }

    if (visibility <= 0) return;

    // Update shake
    shakeEffect.setIntensity(shakeIntensity);
    const shakeOffset = shakeEffect.update();

    // --- Step 1: Render content at full size to offscreen canvas ---
    offscreenRenderer.clear();
    drawContent(time, visibility);

    // Apply pixel effects to the offscreen canvas (at full resolution)
    if (glitchIntensity > 0.03) {
        glitchEffect.apply(offscreenRenderer, glitchIntensity);
    }
    if (scanlineOpacity > 0) {
        scanlinesEffect.apply(offscreenRenderer, scanlineOpacity, time);
    }

    // --- Step 2: Composite offscreen canvas onto main canvas with transforms ---
    const cx = CONFIG.width / 2;
    const cy = CONFIG.height / 2;

    renderer.ctx.save();
    renderer.ctx.imageSmoothingEnabled = false;

    // Transform: move to center + offset, rotate, scale, then draw centered
    renderer.ctx.translate(
        cx + Math.floor(offsetX) + shakeOffset.x,
        cy + Math.floor(offsetY) + shakeOffset.y
    );
    renderer.ctx.rotate(rotation);
    renderer.ctx.scale(scale, scale);
    renderer.ctx.translate(-cx, -cy);

    // Draw the pre-rendered content as a single image (transforms apply correctly)
    renderer.ctx.drawImage(offscreenCanvas, 0, 0);

    renderer.ctx.restore();
}

// Animation loop
let frameCount = 0;
function animate(timestamp) {
    if (!timeline.isPlaying && !capturer.isActive()) {
        animationId = requestAnimationFrame(animate);
        return;
    }

    if (frameCount % 30 === 0) {
        console.log('Animating frame', timeline.currentFrame, 'phase:', timeline.getCurrentPhase());
    }
    frameCount++;

    // Frame timing
    const elapsed = timestamp - lastTime;

    if (elapsed >= frameInterval || capturer.isActive()) {
        lastTime = timestamp - (elapsed % frameInterval);

        const time = timeline.getCurrentTime();

        // Draw frame
        drawFrame(time);

        // Capture if needed
        if (capturer.isActive()) {
            capturer.captureFrame();
            updateStatus(`Exporting: ${Math.floor(capturer.getProgress() * 100)}%`);

            if (capturer.isComplete()) {
                updateStatus('Export complete! Downloading...');
                capturer.downloadAsZip().then(() => {
                    updateStatus('Ready');
                });
            }
        }

        // Update UI
        updateFrameCounter();

        // Advance timeline
        timeline.nextFrame();
    }

    animationId = requestAnimationFrame(animate);
}

// UI Updates
function updateFrameCounter() {
    document.getElementById('frameCounter').textContent = timeline.currentFrame;
    document.getElementById('totalFrames').textContent = timeline.totalFrames;
}

function updateStatus(status) {
    document.getElementById('status').textContent = status;
}

// Controls
document.getElementById('playBtn').addEventListener('click', () => {
    console.log('Play clicked');
    timeline.play();
    updateStatus('Playing');
});

document.getElementById('pauseBtn').addEventListener('click', () => {
    console.log('Pause clicked');
    timeline.pause();
    updateStatus('Paused');
});

document.getElementById('resetBtn').addEventListener('click', () => {
    console.log('Reset clicked');
    timeline.reset();
    timeline.pause();
    updateStatus('Reset');
    drawFrame(0);
    updateFrameCounter();
});

document.getElementById('exportBtn').addEventListener('click', () => {
    if (capturer.isActive()) return;

    // Reset timeline and start capture
    timeline.reset();
    capturer.startCapture();
    timeline.play();
    updateStatus('Starting export...');
});

document.getElementById('transparentBg').addEventListener('change', (e) => {
    isTransparentBackground = e.target.checked;
    drawFrame(timeline.getCurrentTime());
});

// Initial draw - show the logo immediately for preview
console.log('Drawing initial frame...');
try {
    renderer.clear();
    offscreenRenderer.clear();
    if (!isTransparentBackground) {
        background.draw(renderer);
    }
    drawContent(0, 1);
    // Composite offscreen to main at full size for preview
    renderer.ctx.drawImage(offscreenCanvas, 0, 0);
    console.log('Initial frame drawn successfully');
} catch (e) {
    console.error('Error drawing frame:', e);
}
updateFrameCounter();
updateStatus('Ready - Press Play');

// Start animation loop
animationId = requestAnimationFrame(animate);

// Expose some things globally for debugging
window.timeline = timeline;
window.capturer = capturer;
window.renderer = renderer;

// Log FFmpeg command for reference
console.log('FFmpeg command for PNG sequence to WebM with alpha:');
console.log(capturer.getFFmpegCommand());
console.log('\nAlternative for ProRes 4444:');
console.log('ffmpeg -framerate 30 -i output/frame_%04d.png -c:v prores_ks -profile:v 4444 -pix_fmt yuva444p10le output/friction_hall_intro.mov');

console.log('=== INITIALIZATION COMPLETE ===');
console.log('Buttons should be functional. Click Play to start animation.');
