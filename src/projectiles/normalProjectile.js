class NormalProjectile extends Entities {

    constructor(x, y, w, h, img) {
        super(x, y, w, h);
    }

    update(){
        this.velocity.x += 0.5;
        this.velocity.y = Math.sin(this.velocity.x/2);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    drawEntity(context, sx, sy) {
        context.fillStyle = "yellow";
        context.fillRect(sx, sy, this.width, this.height);
    }
}