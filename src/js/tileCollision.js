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
                    return true;
                }
                return false;
            }
        );
    }

    Y(entity) {

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
}