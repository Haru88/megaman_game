class Level {

    constructor(resources) {

        const data = resources.get("levelData");

        this._name = data.title;
        this._tileSize = data.tiles.sizeInPixel.w;
        this._widthIndex = data.sizeInTiles.w;
        this._heightIndex = data.sizeInTiles.h;
        this._GRAVITY = data.gravity;
        this._FRICTION = data.friction;

        this.marker = new DebugTileMarker(this._tileSize, this._tileSize);

        this._tiles = [];

        for (let i = 0; i < this._widthIndex * this._heightIndex; ++i) {
            this._tiles.push(new Tile("wall", (i % this._widthIndex) * this._tileSize,
                Math.floor(i / this._widthIndex) * this._tileSize, this._tileSize, this._tileSize, resources));
        }

        data.tiles.area.forEach(tile => {
            for (let i = tile.x; i < tile.w; ++i) {
                for (let j = tile.y; j < tile.h; ++j) {
                    if (i >= 0 && i < this._widthIndex && j >= 0 && j < this._heightIndex) {
                        if(tile.solid){
                            this._tiles[j * this._widthIndex + i].solid = true;
                        }
                        if(tile.jumpThrough){
                            this._tiles[j * this._widthIndex + i].jumpThrough = true;
                        }    
                    }
                }
            }
        });

        this._drawTileLayer = this._createTileLayer(this._tiles, this._widthIndex * this._tileSize,
            this._heightIndex * this._tileSize);

        this._drawBackgroundLayer = this._createBackgroundLayer(resources.get("backgroundImage"),
            this._widthIndex * this._tileSize, this._heightIndex * this._tileSize);
    }

    _createTileLayer(tiles, w, h) {

        const buffer = document.createElement(`canvas`);
        buffer.width = w;
        buffer.height = h;

        const context = buffer.getContext(`2d`);
        context.fillStyle = `rgb(100, 130, 50)`;

        for(let i = 0; i < tiles.length; ++i){
            const tile = tiles[i];
            if(i > this._widthIndex && !tiles[i - this._widthIndex].isSolid){
                context.fillStyle = `rgb(50, 65, 25)`;
            }else{
                context.fillStyle = `rgb(100, 130, 50)`;
            }
            if (tile.isSolid) {
                context.fillRect(tile.posX, tile.posY, this._tileSize, this._tileSize);
            }
            if (tile.isJumpThrough) {
                context.fillStyle = `rgb(40, 40, 0)`;
                context.fillRect(tile.posX, tile.posY, this._tileSize, 4);
            }
        }

        context.strokeStyle = `rgb(40, 40, 0)`;

        tiles.forEach((tile) => {
            if (tile.isSolid) {
                context.strokeRect(tile.posX, tile.posY, this._tileSize, this._tileSize);
            }
        });

        return (context, x, y) => {
            context.drawImage(buffer, x, y);
        };
    }

    _createBackgroundLayer(gImg, w, h) {

        const buffer = document.createElement(`canvas`);
        buffer.width = w;
        buffer.height = h;

        const context = buffer.getContext(`2d`);

        const pattern = context.createPattern(gImg.canvas, 'repeat');
        context.fillStyle = pattern;
        context.fillRect(0, 0, w, h);

        return (context, x, y) => {
            context.drawImage(buffer, x, y);
        };
    }

    toIndex(pos) {
        return Math.floor(pos / this._tileSize);
    }

    getTileByPosition(posX, posY) {
        return this._tiles[this.toIndex(posY) * this._widthIndex + this.toIndex(posX)];
    }

    getRangeOfTileByEntity(entity) {

        const matches = [];

        const y1 = this.toIndex(entity.posY);
        const y2 = this.toIndex(entity.posY + entity.height) ? this.toIndex(entity.posY + entity.height) : this._heightIndex;
        const x1 = this.toIndex(entity.posX);
        const x2 = this.toIndex(entity.posX + entity.width) ? this.toIndex(entity.posX + entity.width) : this._widthIndex;

        for(let j = x1; j < x2; ++ j){
            for(let i = y1; i < y2; ++i){
            
                const match = this.getTileByIndex(i, j);

                if(match){
                    match._name = `${j} / ${i}`;
                    matches.push(match);
                }
            }
        }

        //console.log(matches);
        return matches;
    }

    getTileByIndex(IndexX, IndexY) {
        return this._tiles[IndexX * this._widthIndex + IndexY];
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
        return this._widthIndex;
    }

    get widthPX() {
        return this._widthIndex * this._tileSize;
    }

    get height() {
        return this._heightIndex;
    }

    get heightPX() {
        return this._heightIndex * this._tileSize;
    }
}