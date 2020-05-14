class Physics {

    constructor(level) {
        this._entities = [];
        this._level = level;
        this._tileCollision = new TileCollision(4, this._level);
    }

    update(delta) {
        this._entities.forEach(entity => {
            this._level.marker.clear();
            //X
            this._friction(entity);
            if(entity.velocity.x > 0){
                this._tileCollision.right(entity);
            }else if(entity.velocity.x < 0){
                this._tileCollision.left(entity);
            }
            entity.position.x += entity.velX;
            //Y
            this._gravity(entity);
            if(entity.velocity.y < 0){
                this._tileCollision.up(entity);
            }else{
                this._tileCollision.down(entity);
            }
            entity.position.y += entity.velY;  
            
        });
    }

    _gravity(entity) {
        if (entity.bounds.bottom < this._level.heightPX) {        
            entity.velocity.y += 0.9//this._level.gravity; 
            entity.velocity.y *= 0.9; 
        }  
    }

    _friction(entity) {
        entity.velocity.x *= 0.7//this._level.friction;
    }

    _collide(entity, another) {a
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