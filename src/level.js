class Level {

    constructor(width, height) {

        this._blockSize = 10;
        this._width = width / this._blockSize;
        this._height = height / this._blockSize;
        this._Tiles = [];

        this._GRAVITY = 0.6;
        this._FRICTION = 0.3;

        for (let i = 0; i < this._width * this._height; ++i) {
            this._Tiles.push(new Tile((i % this._width) * this._blockSize, Math.floor(i / this._width) * this._blockSize));
        }

        this.initDebugStage();

        this._drawTileLayer = this.createTileLayer(this._Tiles, this._width * this._blockSize, this._height * this._blockSize);

        this._load = new Image();
        this._load.crossOrigin = "Anonymous";
        this._load.src = "https://informatik.hs-bremerhaven.de/tfiedler1/bg.png";
        this._load.onload = () => {
            this._image = this._load;
            this._drawBackgroundLayer = this.createBackgroundLayer(this._image, this._width * this._blockSize, this._height * this._blockSize);
        }
    }

    createTileLayer(tiles, w, h) {

        const buffer = document.createElement(`canvas`);
        buffer.width = w;
        buffer.height = h;

        const context = buffer.getContext(`2d`);
        context.fillStyle = `rgb(150, 100, 100)`;

        tiles.forEach((tile) => {
            if (tile.isSolid) {
                context.fillRect(tile.posX, tile.posY, 10, 10);
            }
        });

        return (context, x, y) => {
            context.drawImage(buffer, x, y);
        };
    }

    createBackgroundLayer(img, w, h) {

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
        return Math.floor(pixel / this._blockSize);
    }

    _pointToIndex(x, y) {
        return this._pixToBlocks(y) * this._width + this._pixToBlocks(x);
    }

    getTile(x, y) {
        return this._Tiles[this._pointToIndex(x, y)];
    }

    getTiles() {
        return this._Tiles;
    }

    initDebugStage() {

        for (let x = 0; x < this._width; ++x) {
            this._Tiles[0 * this._width + x].solid = true;
            if (x < 20) {
                this._Tiles[1 * this._width + x].solid = true;
            }
            if (x > 23 && x < 29) {
                this._Tiles[16 * this._width + x].solid = true;
            }
            if (x > 33 && x < 39) {
                this._Tiles[11 * this._width + x].solid = true;
            }
            if (x > 82 && x < 88) {
                this._Tiles[11 * this._width + x].solid = true;
            }
            if (x > 72 && x < 78) {
                this._Tiles[11 * this._width + x].solid = true;
            }
            if (x > 13 && x < 19) {
                this._Tiles[21 * this._width + x].solid = true;
            }
            for (let y = 0; y < this._height; ++y) {
                if (x >= this.width - 1) {
                    //this._blocks[y * this._width + x].solid = true;
                }
                if (y >= 15 && x >= this.width - 10) {
                    this._Tiles[y * this._width + x].solid = true;
                }
                if (y >= 11 && x > 46 && x < 66) {
                    this._Tiles[y * this._width + x].solid = true;
                }
                if (y <= 6 && x > 50 && x < 62) {
                    this._Tiles[y * this._width + x].solid = true;
                }
                if (y >= 20) {
                    if (x >= 0 && x < 10 || x >= this.width - 15) {
                        this._Tiles[y * this._width + x].solid = true;
                    }
                    if (y >= 25) {
                        this._Tiles[y * this._width + x].solid = true;
                    }
                }
            }
        }
    }

    get gravity() {
        return this._GRAVITY;
    }

    get friction() {
        return this._FRICTION;
    }

    get blockSize() {
        return this._blockSize;
    }

    get data() {
        return this._Tiles;
    }

    get width() {
        return this._width;
    }

    get widthPX() {
        return this._width * this._blockSize;
    }

    get height() {
        return this._height;
    }

    get heightPX() {
        return this._height * this._blockSize;
    }
}