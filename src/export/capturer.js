// PNG sequence export capturer

export class Capturer {
    constructor(canvas, fps = 30, totalSeconds = 8) {
        this.canvas = canvas;
        this.fps = fps;
        this.totalFrames = fps * totalSeconds;
        this.frames = [];
        this.isCapturing = false;
        this.currentCaptureFrame = 0;
    }

    // Start capture
    startCapture() {
        this.frames = [];
        this.currentCaptureFrame = 0;
        this.isCapturing = true;
    }

    // Capture current frame
    captureFrame() {
        if (!this.isCapturing) return false;

        const dataUrl = this.canvas.toDataURL('image/png');
        this.frames.push({
            frame: this.currentCaptureFrame,
            data: dataUrl
        });

        this.currentCaptureFrame++;

        if (this.currentCaptureFrame >= this.totalFrames) {
            this.isCapturing = false;
            return false;  // Capture complete
        }

        return true;  // More frames to capture
    }

    // Get capture progress (0-1)
    getProgress() {
        return this.currentCaptureFrame / this.totalFrames;
    }

    // Check if capture is in progress
    isActive() {
        return this.isCapturing;
    }

    // Check if capture is complete
    isComplete() {
        return !this.isCapturing && this.frames.length >= this.totalFrames;
    }

    // Download all frames as individual files
    async downloadFrames() {
        for (let i = 0; i < this.frames.length; i++) {
            const frame = this.frames[i];
            const paddedNum = String(frame.frame).padStart(4, '0');
            const filename = `frame_${paddedNum}.png`;

            // Convert data URL to blob
            const response = await fetch(frame.data);
            const blob = await response.blob();

            // Create download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Small delay to prevent browser issues
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    // Download as ZIP (requires JSZip library, fallback to individual files)
    async downloadAsZip() {
        // Check if JSZip is available
        if (typeof JSZip !== 'undefined') {
            const zip = new JSZip();
            const folder = zip.folder('frames');

            for (const frame of this.frames) {
                const paddedNum = String(frame.frame).padStart(4, '0');
                const filename = `frame_${paddedNum}.png`;

                // Convert data URL to base64
                const base64 = frame.data.split(',')[1];
                folder.file(filename, base64, { base64: true });
            }

            const content = await zip.generateAsync({ type: 'blob' });
            const url = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'friction_hall_frames.zip';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            // Fallback: download first and last frames only for preview
            console.log('JSZip not available, downloading sample frames...');
            await this.downloadSampleFrames();
        }
    }

    // Download just sample frames (first, middle, last)
    async downloadSampleFrames() {
        const samples = [
            0,
            Math.floor(this.frames.length / 4),
            Math.floor(this.frames.length / 2),
            Math.floor(this.frames.length * 3 / 4),
            this.frames.length - 1
        ];

        for (const idx of samples) {
            if (idx < this.frames.length) {
                const frame = this.frames[idx];
                const paddedNum = String(frame.frame).padStart(4, '0');
                const filename = `frame_${paddedNum}.png`;

                const response = await fetch(frame.data);
                const blob = await response.blob();

                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
    }

    // Get FFmpeg command for reference
    getFFmpegCommand() {
        return `ffmpeg -framerate ${this.fps} -i frame_%04d.png -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 2M output/friction_hall_intro.webm`;
    }

    // Reset capturer
    reset() {
        this.frames = [];
        this.currentCaptureFrame = 0;
        this.isCapturing = false;
    }
}
