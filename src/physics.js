class Physics {

    constructor(level) {
        this._entities = [];
        this._level = level;

    }

    update() {
        this._entities.forEach(e => {
            this._gravity(e);
            this._friction(e);
            this._collision(e);
        });
    }

    _gravity(entity) {

        if (entity.bounds.bottom < this._level.heightPX) {
            entity.velocity.y += this._level.gravity;
            entity.velocity.y = entity.velocity.y < entity.maxVel.y ? entity.velocity.y : entity.maxVel.y;
        }
    }

    _friction(entity) {

        if (entity.velocity.x > 0) {
            entity.velocity.x -= this._level.friction;

            if (entity.velocity.x < 0) {
                entity.velocity.x = 0;
            }
        } else if (entity.velocity.x < 0) {
            entity.velocity.x += this._level.friction;

            if (entity.velocity.x > 0) {
                entity.velocity.x = 0;
            }
        }
    }

    _overlap(entity, another) {
        if (entity.bounds.bottom > another.bounds.top &&
            entity.bounds.top < another.bounds.bottom &&
            entity.bounds.right > another.bounds.left &&
            entity.bounds.left < another.bounds.right) {
            return true;
        }
        return false;
    }

    _collision(entity) {
        const SCANRATE = 2;
        const MAX_DETECT_RANGE = 2 * this._level.tileSize;

        this.CheckY(entity);
        //this.CheckX(entity);

        if (entity.bounds.left < 0) {
            entity.position.x = this._level.widthPX - entity.dim.w;
        }
        if (entity.bounds.right > this._level.widthPX) {
            entity.position.x = 0;
        }
    }

    CheckY(entity) {
        let tile = this._level.getTile(entity.bounds.left + entity.width / 2, entity.bounds.bottom);

        this._level.marker.get("bottom").y = tile.posY; 
        this._level.marker.get("bottom").x = tile.posX; 

        if (tile && this._overlap(entity, tile) && tile.isSolid) {
            entity.position.y = tile.position.y - entity.dim.h;
            entity.velocity.y = 0;
            return;
        }
        tile = this._level.getTile(entity.bounds.left + entity.width / 2, entity.bounds.top);   

        this._level.marker.get("top").y = tile.posY; 
        this._level.marker.get("top").x = tile.posX;

        if (tile && this._overlap(entity, tile) && tile.isSolid) {
            entity.position.y = tile.bounds.bottom;
            entity.velocity.y = 0;
            return;
        }
    }

    CheckX(entity) {
        let tile = this._level.getTile(entity.bounds.right, entity.bounds.bottom);
        if (this._overlap(entity, tile) && tile.isSolid) {
            entity.position.x = tile.position.x - entity.width;
            entity.velocity.x = 0;
            return;
        }
        tile = this._level.getTile(entity.bounds.left, entity.bounds.bottom);
        if (tile && this._overlap(entity, tile) && tile.isSolid) {
            entity.position.x = tile.bounds.right;
            entity.velocity.x = 0;
        }
    }

    xxxxCheckY(entity, SCANRATE, MAX_DETECT_RANGE) {
        //top
        let upCheck = false;
        let downCheck = false;
        let range = 0;
        console.log(`up:${upCheck}`, `down:${downCheck}`);
        while (!upCheck.isSolid || !downCheck.isSolid && range < MAX_DETECT_RANGE) {
            upCheck = this._level.getTile(entity.bounds.left + entity.width / 2, entity.bounds.top - range);
            downCheck = this._level.getTile(entity.bounds.left + entity.width / 2, entity.bounds.bottom + range);
            range += SCANRATE;
        }
        if (this._overlap(entity, upCheck)) {
            //console.log(`ceiling ${upCheck.name} touched by ${entity.name}`);
            entity.position.y = upCheck.bounds.bottom;
            entity.velocity.y = 0.01;

        } else if (this._overlap(entity, downCheck)) {
            //console.log(`floor ${downCheck.name} touched by ${entity.name}`);
            entity.position.y = downCheck.position.y - entity.dim.h;
            entity.velocity.y = 0;
        }

    }

    yyyCheckX(SCANRATE, MAX_DETECT_RANGE) {
        //Left
        let nextWall = false;
        let range = 0;

        if (entity.velocity.x < 0) {
            while (!nextWall.isSolid && range < MAX_DETECT_RANGE) {
                nextWall = this._level.getTile(entity.bounds.left - range, entity.bounds.bottom - this._level.tileSize);
                range += SCANRATE;
            }
            if (nextWall.isSolid && this._overlap(entity, nextWall)) {
                console.log(`left ${nextWall.name} touched by ${entity.name}`);
                entity.position.x = nextWall.bounds.right;
                entity.velocity.x = 0;
            }
        }

        //Right
        nextWall = false;
        range = 0;

        if (entity.velocity.x > 0) {
            while (!nextWall.isSolid && range < MAX_DETECT_RANGE) {
                nextWall = this._level.getTile(entity.bounds.right + range, entity.bounds.bottom - this._level.tileSize);
                if (!nextWall.isSolid)
                    nextWall = this._level.getTile(entity.bounds.right + range, entity.bounds.top - this._level.tileSize);
                range += SCANRATE;
            }
            if (nextWall.isSolid && this._overlap(entity, nextWall)) {
                console.log(`right ${nextWall.name} touched by ${entity.name}`);
                entity.position.x = nextWall.position.x - entity.dim.w;
                entity.velocity.x = 0;
            }
        }
    }

    add(entity) {
        if (entity instanceof Entities) {
            this._entities.push(entity);
        } else {
            throw "Wrong!";
        }
    }
}