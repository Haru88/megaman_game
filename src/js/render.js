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

    onTickBefore(callback = () => { }) {
        this._onTickBeforeEvent = callback;
    }

    onTickAfter(callback = () => { }) {
        this._onTickAfterEvent = callback;
    }

    onRender(callback = () => { }) {
        this._onRender = callback;
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

            if (!this._pause && currInterval >= this._deltaSpeed) {
                this._onTickBeforeEvent(currInterval);
            }

            this._onRender();

            if (!this._pause && currInterval >= this._deltaSpeed) {
                this._onTickAfterEvent(currInterval);
            }
        };

        requestAnimationFrame(RENDER);

    }

}