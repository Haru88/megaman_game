class Level {

    constructor(width, height, resources) {

        const data = resources.get("levelData");
        console.log(data);

        this._tileSize = 10;
        this._width = width / this._tileSize;
        this._height = height / this._tileSize;
        this._tiles = [];

        this._GRAVITY = 0.6;
        this._FRICTION = 0.3;

        for (let i = 0; i < this._width * this._height; ++i) {
            this._tiles.push(new Tile(
                "wall",
                (i % this._width) * this._tileSize,
                Math.floor(i / this._width) * this._tileSize,
                this._tileSize,
                this._tileSize,
                resources));
        }

        this.initDebugStage();

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

    initDebugStage() {

        for (let x = 0; x < this._width; ++x) {
            this._tiles[0 * this._width + x].solid = true;
            if (x < 20) {
                this._tiles[1 * this._width + x].solid = true;
            }
            if (x > 23 && x < 29) {
                this._tiles[16 * this._width + x].solid = true;
            }
            if (x > 33 && x < 39) {
                this._tiles[11 * this._width + x].solid = true;
            }
            if (x > 82 && x < 88) {
                this._tiles[11 * this._width + x].solid = true;
            }
            if (x > 72 && x < 78) {
                this._tiles[11 * this._width + x].solid = true;
            }
            if (x > 13 && x < 19) {
                this._tiles[21 * this._width + x].solid = true;
            }
            for (let y = 0; y < this._height; ++y) {
                if (x >= this.width - 1) {
                    //this._blocks[y * this._width + x].solid = true;
                }
                if (y >= 15 && x >= this.width - 10) {
                    this._tiles[y * this._width + x].solid = true;
                }
                if (y >= 11 && x > 46 && x < 66) {
                    this._tiles[y * this._width + x].solid = true;
                }
                if (y <= 6 && x > 50 && x < 62) {
                    this._tiles[y * this._width + x].solid = true;
                }
                if (y >= 20) {
                    if (x >= 0 && x < 10 || x >= this.width - 15) {
                        this._tiles[y * this._width + x].solid = true;
                    }
                    if (y >= 25) {
                        this._tiles[y * this._width + x].solid = true;
                    }
                }
            }
        }
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