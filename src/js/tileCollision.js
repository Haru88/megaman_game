class TileCollision {

    constructor(offset, level) {
        this._offset = offset;
        this._level = level;
    }

    down(entity) {

        let tile = { isSolid: false, isJumpThrough: false };
        for (let tilePos = entity.posY; !tile.isSolid && !tile.isJumpThrough; tilePos += this._level.tileSize) {

            const findings = [this._level.getTileByPosition(entity.bounds.left, tilePos),
            this._level.getTileByPosition(entity.bounds.centerX, tilePos),
            this._level.getTileByPosition(entity.bounds.right, tilePos)
            ];

            for (const f of findings) {
                if (f && f.isSolid || f && f.isJumpThrough) {
                    tile = f;
                    break;
                }
            }
        }

        if(tile.isSolid || tile.isJumpThrough){
            this._level.marker.get("d").y = tile.posY;
            this._level.marker.get("d").x = tile.posX;
    
            if (entity.bounds.bottom < tile.bounds.top + 1 && //this line is only for the jumpThrough-purpose
                (entity.bounds.bottom + entity.velocity.y) > tile.bounds.top) {
                entity.velocity.y = 0;
                entity.position.y = tile.bounds.top - entity.height;
            }
        }
    }

    up(entity) {

        let tile = { isSolid: false };
        for (let tilePos = entity.posY; !tile.isSolid && tilePos > 0; tilePos += this._level.tileSize * -1) {

            const range = [entity.bounds.left, entity.bounds.centerX, entity.bounds.right];

            for (const r of range) {
                const f = this._level.getTileByPosition(r, tilePos);
                if (f && f.isSolid) {
                    tile = f;
                    break;
                }
            }
        }

        if (tile.isSolid) {
            this._level.marker.get("t").y = tile.posY;
            this._level.marker.get("t").x = tile.posX;

            if ((entity.bounds.top + entity.velocity.y) < tile.bounds.bottom) {
                entity.velocity.y = 0;
                entity.position.y = tile.bounds.bottom + 1;
            }
        }
    }


    right(entity) {

        let tile = { isSolid: false };
        for (let tilePos = entity.posX; !tile.isSolid; tilePos += this._level.tileSize) {

            const findings = [
                this._level.getTileByPosition(tilePos, entity.bounds.top),
                this._level.getTileByPosition(tilePos, entity.bounds.centerY),
                this._level.getTileByPosition(tilePos, entity.bounds.bottom - 2)];

            for (const f of findings) {
                if (f && f.isSolid) {
                    tile = f;
                    break;
                }
            }
        }

        if (tile.isSolid) {
            this._level.marker.get("r").y = tile.posY;
            this._level.marker.get("r").x = tile.posX;

            if ((entity.bounds.right + entity.velocity.x) >= tile.bounds.left - 1) {
                entity.velocity.x = 0;
                entity.position.x = tile.bounds.left - entity.width - 1;
            }
        }
        return false;
    }

    left(entity) {

        let tile = { isSolid: false };
        for (let tilePos = entity.posX; !tile.isSolid; tilePos -= this._level.tileSize) {

            const findings = [
                this._level.getTileByPosition(tilePos, entity.bounds.top),
                this._level.getTileByPosition(tilePos, entity.bounds.centerY),
                this._level.getTileByPosition(tilePos, entity.bounds.bottom - 2)];

            for (const f of findings) {
                if (f && f.isSolid) {
                    tile = f;
                    break;
                }
            }
        }

        if (tile.isSolid) {
            this._level.marker.get("l").y = tile.posY;
            this._level.marker.get("l").x = tile.posX;

            if ((entity.bounds.left + entity.velocity.x) < tile.bounds.right + 1) {
                entity.velocity.x = 0;
                entity.position.x = tile.bounds.right + 1;
            }
        }
    }
}