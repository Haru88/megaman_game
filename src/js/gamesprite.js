class GameSprite {

    constructor(img, tw, th) {
        this._img = img;
        this._tw = tw;
        this._th = th;
    }

    get(x, y) {

        return [x * tw, y * th];
    }

    mirrorX() {

        const c = document.createElement("canvas");
        c.width = this._img.width;
        c.height = this._img.height;
        const context = c.getContext("2d");
        context.scale(-1, 1);
        context.translate(-this._img.width, 0);
        context.drawImage(this._img, 0, 0);
        this._img = c;

        return this;
    }

    get tileSize() {
        return [this._tw, this._th];
    }

    get image() {
        return this._img;
    }

}