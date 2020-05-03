class Physics {

    constructor(level) {
        this._entities = [];
        this._level = level;

    }

    update() {
        this._entities.forEach(entity => {

            this._level.marker.clear();

            this._gravity(entity);
            this._friction(entity);

            entity.updateVelocityY();
            this._CheckCollisionY(entity);

            entity.updateVelocityX();
            this._CheckCollisionX(entity);
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

    _CheckCollisionY(entity) {

        const offset = 0; //Add to position to avoid collision interference with the other axis.

        const matches = [];

        [[entity.bounds.left, entity.bounds.bottom],
        [entity.bounds.right, entity.bounds.bottom],
        [entity.bounds.centerX, entity.bounds.bottom],
        [entity.bounds.left, entity.bounds.top],
        [entity.bounds.right, entity.bounds.top],
        [entity.bounds.centerX, entity.bounds.top]]

            .forEach(e => {
                const tile = this._level.getTileByPosition(e[0], e[1]);
                if (tile && tile.isSolid) {
                    matches.push(tile);
                }
            })

        for (const tile of matches) {
            this._level.marker.get(`y`).y = tile.posY;
            this._level.marker.get(`y`).x = tile.posX;

            if (entity.velocity.y > 0) {
                entity.position.y = tile.position.y - entity.height;
                entity.velocity.y = 0;
                break;
            } else if (entity.velocity.y < 0) {
                console.log("top collision occured", entity.position, tile.position);
                entity.position.y = tile.position.y + tile.height;
                entity.velocity.y = 0;
                break;
            }
        }
    }

    _CheckCollisionX(entity) {

        const offset = 0; //Add to position to avoid collision interference with the other axis.

        const matches = [];

        [[entity.bounds.left - offset, entity.bounds.top],
        [entity.bounds.left - offset, entity.bounds.centerY],
        [entity.bounds.left - offset, entity.bounds.bottom - 2],
        [entity.bounds.right, entity.bounds.top],
        [entity.bounds.right, entity.bounds.centerY],
        [entity.bounds.right, entity.bounds.bottom - 2]]

            .forEach(e => {
                const tile = this._level.getTileByPosition(e[0], e[1]);
                if (tile && tile.isSolid) {
                    matches.push(tile);
                }
            })

        for (const tile of matches) {
            this._level.marker.get(`x`).y = tile.posY;
            this._level.marker.get(`x`).x = tile.posX;

            if (entity.velocity.x < 0) {
                console.clear();
                console.log("left collision occured", entity.position, tile.position);
                entity.position.x = tile.position.x + tile.width + offset;
                entity.velocity.x = 0;
                break;
            } else if (entity.velocity.x > 0) {
                console.clear();
                console.log("right collision occured", entity.position, tile.position);
                entity.position.x = tile.position.x - entity.width;
                entity.velocity.x = 0;
                break;
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