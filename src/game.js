
fetch("https://informatik.hs-bremerhaven.de/tfiedler1/games/megaman_game/level/devLevel.json")
    .then(response => response.json())
    .then(levelData => {

        console.log("LEVELDATA:", levelData);

        Promise.all(
            [
                Promise.resolve({ tag: "levelData", file: levelData }),
                Loader.Imagefile("playerSprite", "https://informatik.hs-bremerhaven.de/tfiedler1/megaman_sprite.png"),
                Loader.Imagefile("backgroundImage", levelData.backgroundImageURL),
                Loader.Audiofile("jumpSound", "https://informatik.hs-bremerhaven.de/tfiedler1/flicker.wav"),
                Loader.Audiofile("landSound", "https://informatik.hs-bremerhaven.de/tfiedler1/land.wav")
            ]
        ).then(values => {

            const resources = new Map();
            values.forEach(e => resources.set(e.tag, e.file));
            new Game().init(resources);

        });
    });

class Game {

    init(resources) {

        this._level = new Level(resources);

        this._canvas = document.getElementById("canvas");
        this._canvas.width = this._level.widthPX;
        this._canvas.style.width = "1100px";
        this._canvas.height = this._level.heightPX;

        this._canvas2 = document.getElementById("canvas2");
        this._canvas2.width = 500;
        this._canvas2.style.width = "1100px";
        this._canvas2.height = 290;

        this._MEGAMAN = new Player("Megaman", 230, 170, 30, 40, resources);

        this._input = new Input(this._MEGAMAN);

        this._physics = new Physics(this._level);
        this._physics.add(this._MEGAMAN);

        //this._projectile = new NormalProjectile("np", 200, 180, 5, 5);

        //this._physics.add(this._projectile);

        this._camera0 = new Camera(0, 0, this._level, this._MEGAMAN);
        this._camera = new Camera(0, 0, this._level, this._MEGAMAN);

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
        //this._projectile.update();

        this._physics.update();

        this._camera.update(this._canvas);
        this._camera.update(this._canvas2);

        this._camera0.draw(this._canvas);
        this._camera.draw(this._canvas2);
    }
}

