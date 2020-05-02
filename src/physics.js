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

            entity.updateVelocityX();
            this._CheckCollisionX(entity);

            entity.updateVelocityY(); 
            this._CheckCollisionY(entity);                     
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

        const offset = 2; //Add to position to avoid collision interference with the other axis.

        const matches = [];

        [[entity.bounds.left, entity.bounds.bottom],
        [entity.bounds.right, entity.bounds.bottom],
        [entity.bounds.centerX, entity.bounds.bottom],
        [entity.bounds.left, entity.bounds.top - offset],
        [entity.bounds.right, entity.bounds.top - offset],
        [entity.bounds.centerX, entity.bounds.top - offset]]

            .forEach(e => {
                const tile = this._level.getTileByPosition(e[0], e[1]);
                if (tile && tile.isSolid) {
                    matches.push(tile);
                }
            })
   
        for (const tile of matches) {
            this._level.marker.get(`${tile.posX}${tile.posY}`).y = tile.posY;
            this._level.marker.get(`${tile.posX}${tile.posY}`).x = tile.posX;

            if (entity.velocity.y > 0) {
                entity.position.y = tile.position.y - entity.height;
                entity.velocity.y = 0;
                break;
            } else if (entity.velocity.y < 0) {
                entity.position.y = tile.position.y + tile.height + offset;
                entity.velocity.y = 0;
                break;
            }
        }
    }

    _CheckCollisionX(entity) {

        const offset = 2; //Add to position to avoid collision interference with the other axis.

        const matches = [];
        
        [[entity.bounds.left - offset, entity.bounds.top],
        [entity.bounds.left - offset, entity.bounds.centerY],
        [entity.bounds.left - offset, entity.bounds.bottom - offset],
        [entity.bounds.right + offset, entity.bounds.top],
        [entity.bounds.right + offset, entity.bounds.centerY],
        [entity.bounds.right + offset, entity.bounds.bottom - offset]]

            .forEach(e => {
                const tile = this._level.getTileByPosition(e[0], e[1]);
                if (tile && tile.isSolid) {
                    matches.push(tile);
                }
            })

        //console.log(matches);

        for (const tile of matches) {
            this._level.marker.get(`${tile.posX}${tile.posY}`).y = tile.posY;
            this._level.marker.get(`${tile.posX}${tile.posY}`).x = tile.posX;

            if (entity.velocity.x > 0) {
                entity.position.x = tile.position.x - entity.width - offset;
                entity.velocity.x = 0;
                break;
            } else if (entity.velocity.x < 0) {
                entity.position.x = tile.position.x + tile.width + offset;
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