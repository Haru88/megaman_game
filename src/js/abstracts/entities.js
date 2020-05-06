class Entities {

    constructor(name, x, y, width, height, resources) {

        this.position = { x: x, y: y }
        this.dim = { w: width, h: height }
        this.velocity = { x: 0, y: 0 }

        this._name = name;
        this._resources = resources;
        this._direction = this.direction().right;
        this._ACCELERATION_X = 0.8;
        this._ACCELERATION_Y = 10.5;
        this._MAX_VELOCITY_X = 2.5;
        this._MAX_VELOCITY_Y = 9;

        this._health = 1;
        this._maxHealth = 1;
    }

    get bounds() {
        return {
            top: this.position.y,
            bottom: this.position.y + this.dim.h,
            left: this.position.x,
            right: this.position.x + this.dim.w - 1, 
            centerX: this.position.x + this.dim.w/2,
            centerY: this.position.y + this.dim.h/2
        }
    }

    direction() {
        return {
            right: 1,
            left: 2
        }
    }

    copy() {
        return JSON.parse(JSON.stringify(this));
    }

    input(keyDown) { }

    updatePosX(){
        this.velocity.x = this.velocity.x > this._MAX_VELOCITY_X ? this._MAX_VELOCITY_X : this.velocity.x
        this.position.x += this.velX;
    }

    updatePosY(){
        this.velocity.x = this.velocity.x < -this._MAX_VELOCITY_X ? -this._MAX_VELOCITY_X : this.velocity.x
        this.position.y += this.velY;
    }

    drawEntity(context, x, y) { }

    draw(canvas) { }

    get name(){
        return this._name;
    }

    get maxVel() {
        return {
            x: this._MAX_VELOCITY_X,
            y: this._MAX_VELOCITY_Y
        }
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