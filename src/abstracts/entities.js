class Entities {

    constructor(x, y, width, height) {

        this.position = {
            x: x,
            y: y
        }

        this.dim = {
            w: width,
            h: height
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this._direction = this.direction().right;

        this._ACCELERATION_X = 0.8;
        this._ACCELERATION_Y = 9;
        this._MAX_VELOCITY_X = 3;
        this._MAX_VELOCITY_Y = 10;
    }

    get bounds() {
        return {
            top: this.position.y,
            bottom: this.position.y + this.dim.h,
            left: this.position.x,
            right: this.position.x + this.dim.w
        }
    }

    direction() {
        return {
            right: 1,
            left: 2
        }
    }

    get maxVel() {
        return {
            x: this._MAX_VELOCITY_X,
            y: this._MAX_VELOCITY_Y
        }
    }

    copy() {
        return JSON.parse(JSON.stringify(this));
    }

    input(keyDown) { }

    update() { }

    drawEntity(context, x, y) {}

    draw(canvas) { }


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