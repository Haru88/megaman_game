class Player extends Entities {

    constructor(name, x, y, width, height, resources) {
        super(name, x, y, width, height, resources);

        this.changeActionStateTo.stand();
        this._sprites = this._spriteAnimations(0);

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
    }

    get changeActionStateTo() {
        return {
            stand: () => this._currState = new Stand(this),
            walk: () => this._currState = new Walk(this),
            jump: () => this._currState = new Jump(this),
            fall: () => this._currState = new Fall(this)
        }
    }

    update() {
        this._currState.animate();
        this._currState.onUpdate();

        this._sprite = this._sprites.nextSprite;
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

    _spriteAnimations(num) {

        const img = this._resources.get("playerSprite");

        //standing Right
        const spriteMap = new Map();
        //standing Right
        spriteMap.set(0, new SpriteAnimations(0,
            new Sprite(img, 0, 0, 50, 60, 10)
        ));
        //standing Left
        spriteMap.set(1, new SpriteAnimations(1,
            new Sprite(img, 250, 120, 50, 60, 10)
        ));
        //walking Right
        const duration = 4;
        spriteMap.set(2, new SpriteAnimations(2,
            new Sprite(img, 50, 0, 50, 60, duration), new Sprite(img, 100, 0, 50, 60, duration),
            new Sprite(img, 150, 0, 50, 60, duration), new Sprite(img, 200, 0, 50, 60, duration),
            new Sprite(img, 250, 0, 50, 60, duration), new Sprite(img, 0, 60, 50, 60, duration),
            new Sprite(img, 50, 60, 50, 60, duration), new Sprite(img, 100, 60, 50, 60, duration),
            new Sprite(img, 150, 60, 50, 60, duration), new Sprite(img, 200, 60, 50, 60, duration)
        ));
        //walking Left
        spriteMap.set(3, new SpriteAnimations(3,
            new Sprite(img, 200, 120, 50, 60, duration), new Sprite(img, 150, 120, 50, 60, duration),
            new Sprite(img, 100, 120, 50, 60, duration), new Sprite(img, 50, 120, 50, 60, duration),
            new Sprite(img, 0, 120, 50, 60, duration), new Sprite(img, 250, 180, 50, 60, duration),
            new Sprite(img, 200, 180, 50, 60, duration), new Sprite(img, 150, 180, 50, 60, duration),
            new Sprite(img, 100, 180, 50, 60, duration), new Sprite(img, 50, 180, 50, 60, duration)
        ));
        //Jumping right
        spriteMap.set(4, new SpriteAnimations(4,
            new Sprite(img, 0, 240, 50, 60, 5), new Sprite(img, 50, 240, 50, 60, 5),
            new Sprite(img, 100, 240, 50, 60, 5), new Sprite(img, 150, 240, 50, 60, 1000)
        ));
        //Jumping Left
        spriteMap.set(5, new SpriteAnimations(5,
            new Sprite(img, 250, 300, 50, 60, 5), new Sprite(img, 200, 300, 50, 60, 5),
            new Sprite(img, 150, 300, 50, 60, 5), new Sprite(img, 100, 300, 50, 60, 1000),
        ));

        return spriteMap.get(num);
    }

    draw(context, x, y) {
        if (this._sprite.data[0]) context.drawImage(...this._sprite.data, x - this.width, y - this.height, this._sprite.data[3], this._sprite.data[4]);
    }

}