class Physics {

    constructor(level) {
        this._entities = [];
        this._level = level;
        this._tileCollision = new TileCollision(4, this._level);

        this._gravity = 0.5; //this._level.gravity; 
        this._friction = 0.8; //this._level.friction;
    }

    update(progress) {

        //const delta = progress/25;
        
        this._entities.forEach(entity => {
            //entity.velocity.x *= delta;
            this._level.marker.clear();

            //X
            entity.velocity.x *= this._friction;

            //entity.velocity.x *= delta;
            if(entity.velocity.x > 0){
                this._tileCollision.right(entity);
            }else if(entity.velocity.x < 0){
                this._tileCollision.left(entity);
            }
            entity.position.x += entity.velX;

            //Y  
            //console.log(this._gravity * delta);
            //entity.velocity.y *= delta;
            entity.velocity.y += this._gravity ;   

            //entity.velocity.y *= delta;
            //console.log(entity.velocity.y);
            if(entity.velocity.y < 0){
                this._tileCollision.up(entity);
            }else{
                this._tileCollision.down(entity);
            }          
            entity.position.y += entity.velY;

            //
            if(entity._currAccelerationX > entity._baseAccelerationX){
                entity._currAccelerationX *= 0.99;
            }  
        });
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