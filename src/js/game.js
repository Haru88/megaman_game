
const path = "https://informatik.hs-bremerhaven.de/tfiedler1/";

fetch(path + "games/megaman_game/res/level/devLevel.json")
    .then(response => response.json())
    .then(levelData => {

        console.log("LEVELDATA:", levelData);
        Promise.all(
            [
                Promise.resolve({ tag: "levelData", file: levelData }),
                Loader.Imagefile("playerSprite", path + "games/megaman_res/megaman_sprite.png"),
                Loader.Imagefile("backgroundImage", /*levelData.backgroundImageURL*/path + "games/megaman_res/bg2.png"),
                Loader.Audiofile("jumpSound", path + "games/megaman_res/flicker.wav"),
                Loader.Audiofile("landSound", path + "games/megaman_res/land.wav"),
                Loader.Audiofile("mm7level", path + "games/megaman_res/mm7ruinedhighway.mp3")
            ]
        ).then(values => {

            const resources = new Map();
            values.forEach(e => resources.set(e.tag, e.file));
            new Game().init(resources);

        });
    });

class Game {

    init(resources) {

        this._resources = resources;
        this._level = new Level(resources);

        this._canvas2 = document.getElementById("canvas2");
        this._canvas2.width = 400;
        this._canvas2.style.width = "1100px";
        this._canvas2.height = 290;

        this._MEGAMAN = new Player("Megaman", 950, 140, 15, 30, resources);

        this._input = new Input(this._MEGAMAN);

        this._physics = new Physics(this._level);
        this._physics.add(this._MEGAMAN);

        this._camera = new Camera(0, 0, this._level, this._MEGAMAN);
        //this._camera.turnDebugMode();

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

        if (this._input.keysdown["p"]) {
            this._resources.get("mm7level").play();
        }

        this._input.update();
        this._MEGAMAN.update();
        
        this._camera.update(this._canvas2);
        this._camera.draw(this._canvas2);
        this._physics.update();
    }
}

