class TileCollision {

    constructor(offset, level) {
        this._offset = offset;
        this._level = level;
    }

    _check(positions, marker, callback) {
        const matches = [];

        positions.forEach(e => {
            const tile = this._level.getTileByPosition(e[0], e[1]);
            if (tile && tile.isSolid) {
                matches.push(tile);
            }
        })

        for (const tile of matches) {
            this._level.marker.get(marker).y = tile.posY;
            this._level.marker.get(marker).x = tile.posX;

            return callback(tile);
        }
    }

    right(entity) {
        return this._check(
            [[entity.bounds.right + this._offset, entity.bounds.top],
            [entity.bounds.right + this._offset, entity.bounds.centerY],
            [entity.bounds.right + this._offset, entity.bounds.bottom - 2]
            ],
            "x",
            tile => {
                if (entity.velocity.x > 0) {
                    //console.log("right touched", tile)
                    //entity.position.x = tile.position.x - entity.width;
                    return true;
                }
                return false;
            }
        );
    }

    left(entity) {
        return this._check(
            [[entity.bounds.left - this._offset, entity.bounds.top],
            [entity.bounds.left - this._offset, entity.bounds.centerY],
            [entity.bounds.left - this._offset, entity.bounds.bottom - 2]
            ],
            "x",
            tile => {
                if (entity.velocity.x < 0) {
                    //console.log("left touched", tile)
                    //entity.position.x = tile.position.x + tile.width
                    return true;
                }
                return false;
            }
        );
    }

    //NOT IN USE
    bottom(entity) {
        return this._check(
            [[entity.bounds.centerX, entity.bounds.bottom + this._offset],
            [entity.bounds.right, entity.bounds.bottom + this._offset],
            [entity.bounds.left, entity.bounds.bottom + this._offset]],
            "yB",
            tile => {
                if (entity.velocity.y > 0) {
                    //console.log("bottom touched", tile)
                    entity.position.y = tile.position.y - entity.height;
                    return true;
                }
                return false;
            }
        );
    }

    //NOT IN USE
    top(entity) {
        return this._check(
            [[entity.bounds.centerX, entity.bounds.top - this._offset],
            [entity.bounds.right, entity.bounds.top - this._offset],
            [entity.bounds.left, entity.bounds.top - this._offset]],
            "yT",
            tile => {
                if (entity.velocity.y < 0) {
                    //console.log("top touched", tile)
                    entity.position.y = tile.position.y + tile.height;
                    return true;
                }
                return false;
            }
        );
    }

    Y(entity) {

        const offset = 0; //Add to position to avoid collision interference with the other axis.

        const matches = [];

        [[entity.bounds.centerX, entity.bounds.bottom],
        [entity.bounds.left, entity.bounds.bottom],
        [entity.bounds.right, entity.bounds.bottom],
        [entity.bounds.centerX, entity.bounds.top],
        [entity.bounds.left, entity.bounds.top],
        [entity.bounds.right, entity.bounds.top],
        ]

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
                //console.log("top collision occured", entity.position, tile.position);
                entity.position.y = tile.position.y + tile.height;
                entity.velocity.y = 0.01;
                break;
            }
        }
    }

    //DEPRECATED
    X(entity) {

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
                //console.clear();
                //console.log("left collision occured", entity.position, tile.position);
                entity.position.x = tile.position.x + tile.width + offset;
                entity.velocity.x = 0;
                break;
            } else if (entity.velocity.x > 0) {
                //console.clear();
                //console.log("right collision occured", entity.position, tile.position);
                entity.position.x = tile.position.x - entity.width;
                entity.velocity.x = 0;
                break;
            }
        }
    }
}