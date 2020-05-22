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

    turnDebugMode() {
        this._debug = !this._debug;
    }

    draw(canvas) {

        const player = this._entities[0];
        //console.log(player.position, player.bounds)

        const context = canvas.getContext(`2d`);
        //Background
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (!this._debug) {
            this._level._drawBackgroundLayer(context, -this._sx / 1.4, -this._sy / 1.4);
        }

        //Level
        this._level._drawTileLayer(context, -this._sx, -this._sy);

        if (this._debug) {
            this._level.marker.drawEach(context, -this._sx, -this._sy);
            this._drawDebugHelper(player, context, player.posX - this._sx, player.posY - this._sy);
        }

        //Entities
        this._entities.forEach(entity => entity.draw(context, entity.posX - this._sx, entity.posY - this._sy));

    }

    _drawDebugHelper(player, context, x, y) {
        
        context.fillStyle = "rgba(0,0,255,20)";
        context.fillRect(x, y, player.width, player.height);

        context.font = "10px Comicd Sans MS";
        context.fillStyle = "rgb(255,255,255)";

        context.fillText(`Framerate: ${document.getElementById("fps").textContent}`, 10, 10);

        context.fillText("Velocity:  " + player.velX.toFixed(2) + "  /  " + player.velY.toFixed(2), 10, 20);

        context.fillText("Position:  " + player.position.x.toFixed(2) + "  /  " + player.position.y.toFixed(2) +
            " (" + this._level.toIndex(player.position.x) + "  /  " + this._level.toIndex(player.position.y) + ")", 10, 30);

        context.fillText("Collision on X-Axis:  " + this._level.marker.get("x").x + "  /  " + this._level.marker.get("x").y +
            " (" + this._level.toIndex(this._level.marker.get("x").x) + "  /  " + this._level.toIndex(this._level.marker.get("x").y) + ")", 10, 40);

        context.fillText("Collision on Y-Axis:  " + this._level.marker.get("y").x + "  /  " + this._level.marker.get("y").y +
            " (" + this._level.toIndex(this._level.marker.get("y").x) + "  /  " + this._level.toIndex(this._level.marker.get("y").y) + ")", 10, 50);
    }

}