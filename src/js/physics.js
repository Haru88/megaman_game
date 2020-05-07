class Physics {

    constructor(level) {
        this._entities = [];
        this._level = level;

        this._tileCollision = new TileCollision(4, this._level);

    }

    update() {
        this._entities.forEach(entity => {

            this._level.marker.clear();

            this._gravity(entity);
            this._friction(entity);

            entity.updatePosY();
            this._tileCollision.Y(entity);

            //entity.updatePosX();    
            //this.X(entity);

            /*if (this._tileCollision.top(entity) ||
                this._tileCollision.bottom(entity)) {
                entity.velocity.y = 0;
            } else {
                entity.updatePosY();
            }*/

            if (this._tileCollision.right(entity) ||
                this._tileCollision.left(entity)) {
                entity.velocity.x = 0;
            } else {
                entity.updatePosX();
            }
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

    _collide(entity, another) {
        if (entity.bounds.bottom > another.bounds.top &&
            entity.bounds.top < another.bounds.bottom &&
            entity.bounds.right > another.bounds.left &&
            entity.bounds.left < another.bounds.right) {
            return true;
        }
        return false;
    }

    add(entity) {
        if (entity instanceof Entities) {
            this._entities.push(entity);
        } else {
            throw "Wrong!";
        }
    }
}