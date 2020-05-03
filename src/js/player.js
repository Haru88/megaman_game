class Player extends Entities {

    constructor(name, x, y, width, height, resources) {
        super(name, x, y, width, height, resources);

        this._forbidJumping = false;
        this._currState = this._states.standing;
        this._sprites = this._spriteAnimations(0);

        this._maxHealth = 5;
    }

    update() {
        if (this._currState) {
            this._currState.animation();
            this._currState.movement();
        }

        if (this.velY == 0 && this.velX == 0) {
            this._currState = this._states.standing;
        }
        if (this.velY == 0 && this.velX != 0) {
            this._currState = this._states.walking;
        }
        if (this.velY < 0) {
            this._currState = this._states.jumping;
        }

        this._sprite = this._sprites.nextSprite;
    }

    input(keyDown) {

        if (keyDown["s"]) {

        }

        if (keyDown["a"]) {
            this._direction = this.direction().left;
            if (this.velY == 0) {
                this._currState = this._states.walking;
            } else {
                this.velocity.x -= this._ACCELERATION_X;
            }
        } else if (keyDown["d"]) {
            this._direction = this.direction().right;
            if (this.velY == 0) {
                this._currState = this._states.walking;
            } else {
                this.velocity.x += this._ACCELERATION_X;
            }
        }
        if (keyDown[" "] && !this._forbidJumping) {

            this._resources.get("jumpSound").play();

            this._forbidJumping = true;
            this.velocity.y = -this._ACCELERATION_Y;
            this._currState = this._states.jumping;
        }
        if (!keyDown[" "] && this.velocity.y == 0) {
            this._forbidJumping = false;
        }
        if (!keyDown["a"] && !keyDown["d"] && this._currState.isWalking) {
            this._currState = this._states.standing;
        }
    }

    get _states() {

        return {
            walking: {

                movement: () => {
                    if (this._direction == this.direction().right) {
                        this.velocity.x += this._ACCELERATION_X;
                    } else {
                        this.velocity.x -= this._ACCELERATION_X;
                    }
                    if (this.velocity.y > 0.1) {
                        this._forbidJumping = true;
                    }
                },
                animation: () => {
                    if (this._direction == this.direction().right) {
                        if (this._sprites.id !== 2) {
                            this._sprites = this._spriteAnimations(2);
                        }
                    } else {
                        if (this._sprites.id !== 3) {
                            this._sprites = this._spriteAnimations(3);
                        }
                    }
                },
                isWalking: 1
            },
            jumping: {

                movement: () => {
                    /*if(this._direction == this.direction().right){
                        this.velocity.x += this._ACCELERATION_X;
                    }else{
                        this.velocity.x -= this._ACCELERATION_X;
                    }*/
                    return;
                },
                animation: () => {
                    if (this._direction == this.direction().right) {
                        if (this._sprites.id !== 4) {
                            this._sprites = this._spriteAnimations(4);
                        }
                    } else {
                        if (this._sprites.id !== 5) {
                            this._sprites = this._spriteAnimations(5);
                        }
                    }
                },
                isJumping: 1
            },
            standing: {

                movement: () => {
                    return;
                },
                animation: () => {
                    this._sprites = this._spriteAnimations(this._direction == this.direction().right ? 0 : 1);
                },
                isStanding: 1
            }
        }
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

    get maxVel() {
        return {
            x: this._MAX_VELOCITY_X,
            y: this._MAX_VELOCITY_Y
        }
    }

    draw(context, x, y) {

        //this._drawDebugHelper(context, x, y);      
        if (this._sprite.data[0]) context.drawImage(...this._sprite.data, x - this.width, y - this.height, this._sprite.data[3], this._sprite.data[4]);
    }

}