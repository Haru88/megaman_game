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
        const MAX_DETECT_RANGE = 5 * this._level._blockSize;

        //Left
        let nextWall = false;
        let range = 0;

        if (entity.velocity.x < 0) {
            while (!nextWall.isSolid && range < MAX_DETECT_RANGE) {
                nextWall = this._level.getTile(entity.bounds.left - range, entity.bounds.bottom - this._level._blockSize);
                range += this._level._blockSize;
            }
            if (nextWall.isSolid && this._overlap(entity, nextWall)) {
                console.log("left triggered");
                entity.position.x = nextWall.bounds.right;
                entity.velocity.x = 0;
            }
        }

        //Right
        nextWall = false;
        range = 0;

        if (entity.velocity.x > 0) {
            while (!nextWall.isSolid && range < MAX_DETECT_RANGE) {
                nextWall = this._level.getTile(entity.bounds.right + range, entity.bounds.bottom - this._level._blockSize);
                range += this._level._blockSize;
            }
            if (nextWall.isSolid && this._overlap(entity, nextWall)) {
                console.log("right triggered");
                entity.position.x = nextWall.position.x - entity.dim.w;
                entity.velocity.x = 0;
            }
        }

        //top
        nextWall = false;
        range = 0;

        if (entity.velocity.y < 0) {
            while (!nextWall.isSolid && range < MAX_DETECT_RANGE) {
                nextWall = this._level.getTile(entity.bounds.left, entity.bounds.top - range);
                if (!nextWall.isSolid)
                    nextWall = this._level.getTile(entity.bounds.right, entity.bounds.top - range);
                range += this._level._blockSize;
            }
            if (this._overlap(entity, nextWall)) {
                console.log("top triggerd");
                entity.position.y = nextWall.bounds.bottom;
                entity.velocity.y = 0.01;  
            }
        }

        //floor 
        nextWall = false;
        range = 0;

        if (entity.velocity.y >= 0) {
            while (!nextWall.isSolid && range < MAX_DETECT_RANGE) {
                nextWall = this._level.getTile(entity.bounds.left, entity.bounds.bottom + range);
                if (!nextWall.isSolid)
                    nextWall = this._level.getTile(entity.bounds.right, entity.bounds.bottom + range);
                range += this._level._blockSize;
            }
            if (this._overlap(entity, nextWall)) {
                //console.log("floor triggered");
                entity.position.y = nextWall.position.y - entity.dim.h;
                entity.velocity.y = 0;
            }
        }

        if (entity.bounds.left < 0) {
            entity.position.x = this._level.widthPX - entity.dim.w;
        }
        if (entity.bounds.right > this._level.widthPX) {
            entity.position.x = 0;
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