class Entities {

    constructor(name, x, y, width, height, resources) {

        this.position = { x: x, y: y }
        this.dim = { w: width, h: height }
        this.velocity = { x: 0, y: 0 }

        this._name = name;
        this._resources = resources;
        this._direction = this.direction().right;
        this._baseAccelerationX = 0.8;
        this._currAccelerationX = this._baseAccelerationX;
        this._ACCELERATION_Y = 8;
        this._health = 1;
        this._maxHealth = 1;
    }

    input(keyDown) { }

    draw(context, x, y) { }

    direction() {
        return {
            right: 1,
            left: -1
        }
    }

    copy() {
        return JSON.parse(JSON.stringify(this));
    }

    get headRight(){
        return this._direction === this.direction().right;
    }

    get bounds() {
        return {
            top: this.position.y,
            bottom: this.position.y + this.dim.h,
            left: this.position.x,
            right: this.position.x + this.dim.w, 
            centerX: this.position.x + this.dim.w/2,
            centerY: this.position.y + this.dim.h/2
        }
    }

    get name(){
        return this._name;
    }

    get velX() {
        return this.velocity.x;
    }

    get velY() {
        return this.velocity.y;
    }

    get posX() {
        return this.position.x;
    }

    get posY() {
        return this.position.y;
    }

    get width() {
        return this.dim.w;
    }

    get height() {
        return this.dim.h;
    }

}