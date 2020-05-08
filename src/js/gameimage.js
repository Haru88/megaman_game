class GameImage {

    constructor(img, tw = 0, th = 0) {
        this._img = img;
        this._tw = tw;
        this._th = th;
    }

    get(x, y) {
        return [x * this._tw, y * this._th];
    }

    mirrorY() {
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

    get core() {
        return this._img;
    }

}