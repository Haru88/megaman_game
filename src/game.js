class Game {

    init() {
        this._canvas = document.getElementById("canvas");
        this._canvas.width = 1060;
        this._canvas.style.width = "1200px";
        this._canvas.height = 270;

        this._canvas2 = document.getElementById("canvas2");
        this._canvas2.width = 500;
        this._canvas2.style.width = "1000px";
        this._canvas2.height = 270;

        this._level = new Level(this._canvas.width, this._canvas.height);

        this._MEGAMAN = new Player(230, 170, 30, 40);
        this._MEGAMAN2 = new Player(750, 200, 30, 40);
        this._input = new Input(this._MEGAMAN, this._MEGAMAN2);

        this._physics = new Physics(this._level);
        this._physics.add(this._MEGAMAN);
        this._physics.add(this._MEGAMAN2);

        this._projectile = new NormalProjectile(200, 180, 5, 5);

        this._physics.add(this._projectile);

        this._camera0 = new Camera(0, 0, this._level, this._MEGAMAN);
        this._camera = new Camera(0, 0, this._level, this._MEGAMAN, this._projectile);

        this._run();

    }

    _run() {

        let then = performance.now();
        const fpsLock = 60;
        const interval = 1000 / fpsLock;
        let frame = 0;
        let last = 0;

        const RENDER = () => {

            requestAnimationFrame(RENDER);
            let elapsed = performance.now() - then;
            frame++;
            if ((performance.now() - last) > 1000) {
                last = performance.now();
                document.getElementById("fps").innerHTML = frame.toFixed(0) + " FPS";
                frame = 0;
            }
            if (elapsed > interval) {
                then = performance.now() - (elapsed % interval);

                this._update();
            }
        }
        requestAnimationFrame(RENDER);
    }

    _update() {

        this._input.update();
        this._MEGAMAN.update();
        //this._MEGAMAN2.update();
        this._projectile.update();

        this._camera.update(this._canvas);
        this._camera.update(this._canvas2);

        this._physics.update();

        this._camera0.draw(this._canvas);
        this._camera.draw(this._canvas2);
    }
}

new Game().init();

