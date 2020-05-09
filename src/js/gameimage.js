class GameImage {

    constructor(img, tileWidth = 0, tileHeight = 0) {
        this._img = img;
        this._tileWidth = tileWidth;
        this._tileHeight = tileHeight;

        this._canvas = document.createElement("canvas");
    }

    get(x, y) {
        return [x * this._tileWidth, y * this._tileHeight];
    }

    flipY() {
        const c = this._canvas;
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
        return [this._tileWidth, this._tileHeight];
    }

    get width(){
        return this._img.width;
    }

    get height(){
        return this._img.height;
    }

    get canvas() {
        return this._img;
    }
}