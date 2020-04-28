class Camera {

    constructor(sx, sy, level, ...entities) {
        this._level = level;
        this._entities = entities;
        this._sx = sx;
        this._sy = sy;
        this.follow(entities[0]);
    }

    follow(entity) {
        this._toFollow = entity;
    }

    moveTo(x, y) {

    }

    update(canvas) {
        this._sx = this._toFollow.posX - canvas.width / 2;
        this._sy = this._toFollow.posY - canvas.height / 2;

        if (this._sx < 0) this._sx = 0;
        if (this._sx + canvas.width > this._level.widthPX) this._sx = this._level.widthPX - canvas.width;
        if (this._sy < 0) this._sy = 0;
        if (this._sy + canvas.height > this._level.heightPX) this._sy = this._level.heightPX - canvas.height;
    }

    draw(canvas) {
        const context = canvas.getContext(`2d`);
        //Background
        context.clearRect(0,0,canvas.width, canvas.height);
        this._level._drawBackgroundLayer(context, -this._sx, -this._sy);

        //Level
        this._level._drawTileLayer(context, -this._sx, -this._sy);

        //Entities
        this._entities.forEach(element => {
            element.drawEntity(context, element.posX - this._sx - 10, element.posY - this._sy - 20);
        });
    }

}