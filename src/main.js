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

        const LEVEL = new Level(resources);

        const CANVAS = document.getElementById("canvas2");
        CANVAS.width = 400;
        CANVAS.height = 290;

        const MEGAMAN = new Player("Megaman", 950, 194, 15, 30, resources);

        const INPUT = new Input(MEGAMAN);

        const PHYSICS = new Physics(LEVEL);
        PHYSICS.add(MEGAMAN);

        const CAMERA = new Camera(0, 0, LEVEL, MEGAMAN);
        //CAMERA.turnDebugMode();

        const RENDERER = new Renderer();
        RENDERER.deltaSpeed = 12;

        RENDERER.onTickBefore(delta => {
            INPUT.update();               
            MEGAMAN.update();
        })

        RENDERER.onRender(60, () => {
 
            CAMERA.update(CANVAS);
            CAMERA.draw(CANVAS);

            if (INPUT.keyPressed("t")) {
                MEGAMAN.position.y -= LEVEL.tileSize/4;
            }

            if (INPUT.keyPressed("g")) {
                MEGAMAN.position.y += LEVEL.tileSize/4;
            }

            if (INPUT.keyPressed("p")) {
                RENDERER.pause();
            }

            if (INPUT.keysdown["m"]) {
                resources.get("mm7level").play();
            }
        });

        RENDERER.onTickAfter(delta => {
            PHYSICS.update(delta);   
        })

        RENDERER.start();
    });


