class Renderer {

    constructor() {
        this._deltaSpeed = 17;
        this._pause = false;
    }

    set deltaSpeed(ms){
        this._deltaSpeed = ms;
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

        let prevTime = performance.now();
        let prevTicks = prevTime;

        const RENDER = () => {

            requestAnimationFrame(RENDER);

            frames++;

            const now = performance.now();
            const elapsed = now - prevTime;
            const deltaTime = now - prevTime;

            if (!this._pause && deltaTime >= this._deltaSpeed) {
                this._onTickBeforeEvent(deltaTime);
            }

            if (deltaTime >= 1000) {
                document.getElementById("fps").innerHTML = frames + " FPS";
                
                frames = 0;
            }

            this._onFrameEvent();

            if (!this._pause && deltaTime >= this._deltaSpeed) {              
                //prevTicks = performance.now();
                this._onTickAfterEvent(deltaTime);
            }

            prevTime = performance.now();

        };

        requestAnimationFrame(RENDER);

    }

}