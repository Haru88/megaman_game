class Renderer {

    constructor() {
        this._tickSpeed = 10;
        this._pause = false;
    }

    set tickSpeed(ms){
        this._tickSpeed = ms;
        return this;
    }

    onTickBefore(callback = () => { }) {
        this._onTickBeforeEvent = callback;
    }

    onTickAfter(callback = () => { }) {
        this._onTickAfterEvent = callback;
    }

    onRender(fps, callback = () => { }) {
        this._fpsLock = fps;
        this._onFrameEvent = callback;
    }

    pause(){
        this._pause = !this._pause;
    }

    start() {
        let frames = 0;

        let lastStamp = performance.now();
        let tickStamp = lastStamp;

        const RENDER = () => {

            requestAnimationFrame(RENDER);

            frames++;

            const now = performance.now();
            const elapsed = now - lastStamp;
            const elapsedTicks = now - tickStamp;

            if (!this._pause && elapsedTicks >= this._tickSpeed) {
                this._onTickBeforeEvent();
            }

            if (elapsed >= 1000) {
                document.getElementById("fps").innerHTML = frames + " FPS";
                lastStamp = performance.now();
                frames = 0;
            }

            this._onFrameEvent();

            if (!this._pause && elapsedTicks >= this._tickSpeed) {
                this._onTickAfterEvent();
                tickStamp = performance.now();
            }

        };

        requestAnimationFrame(RENDER);

    }

}