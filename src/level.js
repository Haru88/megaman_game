class Level {

    constructor(resources) {

        const data = resources.get("levelData");

        this._name = data.title;
        this._tileSize = data.tiles.sizeInPixel.w;
        this._width = data.sizeInTiles.w;
        this._height = data.sizeInTiles.h;
        this._GRAVITY = data.gravity;
        this._FRICTION = data.friction;

        this.marker = new DebugTileMarker(this._tileSize, this._tileSize);

        this._tiles = [];

        for (let i = 0; i < this._width * this._height; ++i) {
            this._tiles.push(new Tile("wall", (i % this._width) * this._tileSize,
                Math.floor(i / this._width) * this._tileSize, this._tileSize, this._tileSize, resources));
        }

        data.tiles.area.forEach(tile => {
            for (let i = tile.x; i < tile.w; ++i) {
                for (let j = tile.y; j < tile.h; ++j) {
                    if (i >= 0 && i < this._width && j >= 0 && j < this._height && tile.solid) {
                        this._tiles[j * this._width + i].solid = true;
                    }
                }
            }
        });

        this._drawTileLayer = this._createTileLayer(this._tiles, this._width * this._tileSize,
            this._height * this._tileSize);

        this._drawBackgroundLayer = this._createBackgroundLayer(resources.get("backgroundImage"),
            this._width * this._tileSize, this._height * this._tileSize);
    }

    _createTileLayer(tiles, w, h) {

        const buffer = document.createElement(`canvas`);
        buffer.width = w;
        buffer.height = h;

        const context = buffer.getContext(`2d`);
        context.fillStyle = `rgb(150, 100, 100)`;

        tiles.forEach((tile) => {
            if (tile.isSolid) {
                context.fillRect(tile.posX, tile.posY, this._tileSize, this._tileSize);
            }
        });

        return (context, x, y) => {
            context.drawImage(buffer, x, y);
        };
    }

    _createBackgroundLayer(img, w, h) {

        const buffer = document.createElement(`canvas`);
        buffer.width = w;
        buffer.height = h;

        const context = buffer.getContext(`2d`);

        const pattern = context.createPattern(img, 'repeat');
        context.fillStyle = pattern;
        context.fillRect(0, 0, w, h);

        return (context, x, y) => {
            context.drawImage(buffer, x, y);
        };
    }

    draw(canvas) {

        const context = canvas.getContext("2d");
        this._drawBackgroundLayer(context, 0, 0);
        this._drawTileLayer(context, 0, 0);
        this.DTM.draw(context);
    }

    _pixToBlocks(pixel) {
        return Math.floor(pixel / this._tileSize);
    }

    _pointToIndex(x, y) {
        return this._pixToBlocks(y) * this._width + this._pixToBlocks(x);
    }

    getTile(x, y) {
        return this._tiles[this._pointToIndex(x, y)];
    }

    getTiles() {
        return this._tiles;
    }

    get tileSize() {
        return this._tileSize;
    }

    get gravity() {
        return this._GRAVITY;
    }

    get friction() {
        return this._FRICTION;
    }

    get blockSize() {
        return this._tileSize;
    }

    get data() {
        return this._tiles;
    }

    get width() {
        return this._width;
    }

    get widthPX() {
        return this._width * this._tileSize;
    }

    get height() {
        return this._height;
    }

    get heightPX() {
        return this._height * this._tileSize;
    }
}