class Renderer {

    constructor() {
        this.fpsLock = 60;
        this._deltaSpeed = 17;
        this._pause = false;
    }

    set deltaSpeed(ms) {
        this._deltaSpeed = ms;
        return this;
    }

    set fpsLock(fps) {
        this._fpsLock = {
            interval: 1000 / fps,
            value: fps
        };
        return this;
    }

    get fpsLock() {
        return this._fpsLock;
    }

    onUpdateBeforeRender(callback = () => { }) {
        this._onUpdateBeforeRender = callback;
        return this;
    }

    onUpdateAfterRender(callback = () => { }) {
        this._onUpdateAfterRender = callback;
        return this;
    }

    onRender(callback = () => { }) {
        this._onRender = callback;
        return this;
    }

    pause() {
        this._pause = !this._pause;
    }

    start() {

        let lastTime = performance.now();
        let second = performance.now();
        let frames = 0;

        const RENDER = time => {

            requestAnimationFrame(RENDER);

            const currInterval = time - lastTime; //timeBetweenFrames

            if (currInterval >= this.fpsLock.interval) {
                frames++;
                lastTime = time - (currInterval % this.fpsLock.interval);
            } else {
                return;
            }

            if (performance.now() - second >= 1000) {
                document.getElementById("fps").innerHTML = frames + " FPS";
                frames = 0;
                second = performance.now();
            }

            if (!this._pause /*&& currInterval >= this._deltaSpeed*/) {
                this._onUpdateBeforeRender(currInterval);
            }

            this._onRender();

            if (!this._pause /*&& currInterval >= this._deltaSpeed*/) {
                this._onUpdateAfterRender(currInterval);
            }
        };

        requestAnimationFrame(RENDER);

    }

}