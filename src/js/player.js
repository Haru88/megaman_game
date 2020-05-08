class Player extends Entities {

    constructor(name, x, y, width, height, resources) {
        super(name, x, y, width, height, resources);

        this.changeActionStateTo.stand();
        this._maxHealth = 5;

        this._interalKeys = {
            left: Symbol("left"),
            right: Symbol("right"),
            jump: Symbol("jump"),
        }

        this._keyMap = new Map();
        this._keyMap.set("a", this._interalKeys.left);
        this._keyMap.set("d", this._interalKeys.right);
        this._keyMap.set("w", this._interalKeys.jump);
        this._keyMap.set(" ", this._interalKeys.jump);

        this._spriteSetMap = new Map()
        for (let i = 0; i < 6; ++i) {
            this._spriteSetMap.set(i, tmpHardcodedSpriteCrops(i, this._resources.get("playerSprite"), this._resources.get("playerSpriteMirror")));
        }

        this._sprites = this.spriteSets(0);
    }

    get changeActionStateTo() {
        return {
            stand: () => this._currState = new Stand(this),
            walk: () => this._currState = new Walk(this),
            jump: () => this._currState = new Jump(this),
            fall: () => this._currState = new Fall(this)
        }
    }

    spriteSets(id) {
        return this._spriteSetMap.get(id)();
    }

    update() {
        this._currState.animate();
        this._currState.onUpdate();

        this._sprites.nextSprite();
    }

    input(keyDown) {
        const mapping = {}
        Object.keys(keyDown).forEach(key => {
            if (this._keyMap.has(key)) {
                mapping[this._keyMap.get(key)] = true;
            }
        });
        this._currState.onInput(mapping);
    }

    draw(context, x, y) {
        context.drawImage(...this._sprites.draw(x - this.width, y - this.height));
    }
}


function tmpHardcodedSpriteCrops(num, gImg, gImgM) {

    const W = 50, H = 60;

    const img = gImg;
    const mImg = gImgM;

    //standing Right
    const spriteMap = new Map();
    //standing Right
    spriteMap.set(0, () => new SpriteAnimations(0, img, W, H,
        new Sprite(...gImg.get(0, 0), 10)
    ));
    //standing Left
    spriteMap.set(1, () => new SpriteAnimations(1, mImg, W, H,
        new Sprite(...gImg.get(10, 0), 10)
    ));

    //walking Right
    const duration = 5;
    spriteMap.set(2, () => new SpriteAnimations(2, img, W, H,
        new Sprite(...gImg.get(1, 0), duration), new Sprite(...gImg.get(2, 0), duration),
        new Sprite(...gImg.get(3, 0), duration), new Sprite(...gImg.get(4, 0), duration),
        new Sprite(...gImg.get(5, 0), duration), new Sprite(...gImg.get(6, 0), duration),
        new Sprite(...gImg.get(7, 0), duration), new Sprite(...gImg.get(8, 0), duration),
        new Sprite(...gImg.get(9, 0), duration), new Sprite(...gImg.get(10, 0), duration)
    ));
    //walking Left
    spriteMap.set(3, () => new SpriteAnimations(3, mImg, W, H,
        new Sprite(...gImg.get(10, 0), duration), new Sprite(...gImg.get(9, 0), duration),
        new Sprite(...gImg.get(8, 0), duration), new Sprite(...gImg.get(7, 0), duration),
        new Sprite(...gImg.get(6, 0), duration), new Sprite(...gImg.get(5, 0), duration),
        new Sprite(...gImg.get(4, 0), duration), new Sprite(...gImg.get(3, 0), duration),
        new Sprite(...gImg.get(2, 0), duration), new Sprite(...gImg.get(1, 0), duration)
    ));
    //Jumping right
    spriteMap.set(4, () => new SpriteAnimations(4, img, W, H,
        new Sprite(...gImg.get(0, 2), 5), new Sprite(...gImg.get(1, 2), 5),
        new Sprite(...gImg.get(2, 2), 5), new Sprite(...gImg.get(3, 2), 1000)
    ));
    //Jumping Left
    spriteMap.set(5, () => new SpriteAnimations(5, mImg, W, H,
        new Sprite(...gImg.get(10, 2), 5), new Sprite(...gImg.get(9, 2), 5),
        new Sprite(...gImg.get(8, 2), 5), new Sprite(...gImg.get(7, 2), 1000)
    ));

    return spriteMap.get(num);
}