const path = "https://informatik.hs-bremerhaven.de/tfiedler1/";

fetch(path + "games/megaman_game/res/level/devLevel.json")
    .then(response => response.json())
    .then(levelData => {

        console.log("LEVELDATA:", levelData);

        return Promise.all(
            [
                Promise.resolve({ tag: "levelData", file: levelData }),
                Loader.Imagefile("playerSprite", path + "games/megaman_res/megaman_sprite.png"),
                Loader.Imagefile("backgroundImage", /*levelData.backgroundImageURL*/path + "games/megaman_res/bg2.png"),
                Loader.Audiofile("jumpSound", path + "games/megaman_res/flicker.wav"),
                Loader.Audiofile("landSound", path + "games/megaman_res/land.wav"),
                Loader.Audiofile("slideSound", path + "games/megaman_res/slide.wav"),
                Loader.Audiofile("mm7level", path + "games/megaman_res/mm7ruinedhighway.mp3")
            ])

    }).then(values => {

        const resources = new Map();
        values.forEach(e => resources.set(e.tag, e.file));
        resources.set("playerSprite", new GameImage(resources.get("playerSprite"), 50, 60));
        resources.set("backgroundImage", new GameImage(resources.get("backgroundImage")));
        resources.set("flippedPlayerSprite", new GameImage(resources.get("playerSprite").canvas, 50, 60).flipY());

        return Promise.resolve(resources);

    }).then(resources => {

        const level = new Level(resources);

        const canvas = document.getElementById("canvas2");
        canvas.width = 400;
        canvas.height = 290;

        const MegaMan = new Player("Megaman", 950, 194, 20, 30, resources);

        const gameInput = new Input(MegaMan);

        const gamePhysics = new Physics(level);
        gamePhysics.add(MegaMan);

        const camera = new Camera(0, 0, level, MegaMan);

        const gameRender = new Renderer();
        gameRender.fpsLock = 60;

        gameRender.onUpdateBeforeRender(delta => {
            gameInput.update();               
            MegaMan.update();

        }).onUpdateAfterRender(delta => {
            gamePhysics.update(delta); 

        }).onRender(() => {
            camera.update(canvas);
            camera.draw(canvas);

            if (gameInput.keyPressed("t")) {
                camera.turnDebugMode();
            }

            if (gameInput.keyPressed("p")) {
                gameRender.pause();
            }

            if (gameInput.keyPressed("m")) {
                const track = resources.get("mm7level")
                if(!this._audioplays){
                    this._audioplays = setInterval(()=>{
                        track.play();
                    }, track.duration)
                }else{
                    track.pause();
                    track.currentTime = 0;
                    clearInterval(this._audioplays);
                    this._audioplays = null;
                }
            }
        });

        gameRender.start();
    });


