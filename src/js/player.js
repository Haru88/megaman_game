class Player extends Entities {

    constructor(name, x, y, width, height, resources) {
        super(name, x, y, width, height, resources);

        this.changeActionStateTo.stand();
        this._maxHealth = 5;

        this._interalKeys = {
            left: Symbol("left"),
            right: Symbol("right"),
            jump: Symbol("jump"),
            dash: Symbol("dash"),
            down: Symbol("down"),
            up: Symbol("up"),
            stand: Symbol("stand"),
        }

        this._keyMap = new Map();
        this._keyMap.set("a", this._interalKeys.left);
        this._keyMap.set("d", this._interalKeys.right);
        this._keyMap.set("w", this._interalKeys.up);
        this._keyMap.set(" ", this._interalKeys.jump);
        this._keyMap.set("e", this._interalKeys.dash);
        this._keyMap.set("s", this._interalKeys.down);

        this._spriteSetMap = new Map()
        for (let i = 0; i < 10; ++i) {
            this._spriteSetMap.set(i, tmpHardcodedSpriteCrops(i, this._resources.get("playerSprite"), this._resources.get("flippedPlayerSprite")));
        }

        this._sprites = this.spriteSets(0);
        
        this.fallThrough = false;
    }

    get changeActionStateTo() {
        return {
            stand: () => this._currState = new Stand(this),
            walk: () => this._currState = new Walk(this),
            jump: () => this._currState = new Jump(this),
            fall: () => this._currState = new Fall(this),
            dash: () => this._currState = new Dash(this)
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
                mapping[this._keyMap.get(key)] = keyDown[key];
            }
        });
        this._currState.onInput(mapping);
    }

    draw(context, x, y) {
        context.drawImage(...this._sprites.draw(x - this.width/1.4, y - this.height+1));
    }
}

function tmpHardcodedSpriteCrops2(key, gImg, gImgM) {
    const spriteMap = new Map();
    spriteMap.set(this._interalKeys.stand, dir =>{
        if(dir == this.direction.right){
            new SpriteAnimations(this._interalKeys.stand, gImg, new Sprite(0, 0, 10));
        }else{
            new SpriteAnimations(this._interalKeys.stand, gImgM, new Sprite(10, 0, 10));
        }
    })

    return spriteMap.get(key);
}

function tmpHardcodedSpriteCrops(num, gImg, gImgM) {
    const spriteMap = new Map();
    //standing Right
    spriteMap.set(0,
        () => new SpriteAnimations(0, gImg,
            new Sprite(0, 0, 10)
        ));
    //standing Left
    spriteMap.set(1,
        () => new SpriteAnimations(1, gImgM,
            new Sprite(10, 0, 10)
        ));
    //walking Right
    const duration = 4;
    spriteMap.set(2,
        () => new SpriteAnimations(2, gImg,
            new Sprite(1, 0, duration), new Sprite(2, 0, duration),
            new Sprite(3, 0, duration), new Sprite(4, 0, duration),
            new Sprite(5, 0, duration), new Sprite(6, 0, duration),
            new Sprite(7, 0, duration), new Sprite(8, 0, duration),
            new Sprite(9, 0, duration), new Sprite(10, 0, duration)
        ));
    //walking Left
    spriteMap.set(3,
        () => new SpriteAnimations(3, gImgM,
            new Sprite(9, 0, duration), new Sprite(8, 0, duration),
            new Sprite(7, 0, duration), new Sprite(6, 0, duration),
            new Sprite(5, 0, duration), new Sprite(4, 0, duration),
            new Sprite(3, 0, duration), new Sprite(2, 0, duration),
            new Sprite(1, 0, duration), new Sprite(0, 0, duration)
        ));
    //Jumping right
    spriteMap.set(4,
        () => new SpriteAnimations(4, gImg,
            new Sprite(0, 2, 5), new Sprite(1, 2, 5),
            new Sprite(2, 2, 5), new Sprite(3, 2, 1000)
        ));
    //Jumping Left
    spriteMap.set(5,
        () => new SpriteAnimations(5, gImgM,
            new Sprite(10, 2, 5), new Sprite(9, 2, 5),
            new Sprite(8, 2, 5), new Sprite(7, 2, 1000)
        ));
    //fall right
    spriteMap.set(6,
        () => new SpriteAnimations(6, gImg,
            new Sprite(3, 2, 100)
        ));
    //fall left
    spriteMap.set(7,
        () => new SpriteAnimations(7, gImgM,
            new Sprite(7, 2, 100)
        ));
    //dash right
    spriteMap.set(8,
        () => new SpriteAnimations(6, gImg,
            new Sprite(0, 3, 6),
            new Sprite(1, 3, 100)
        ));
    //dash left
    spriteMap.set(9,
        () => new SpriteAnimations(7, gImgM,
            new Sprite(10, 3, 6),
            new Sprite(9, 3, 100),
        ));

    return spriteMap.get(num);
}