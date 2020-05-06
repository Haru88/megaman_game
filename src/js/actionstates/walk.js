class Walk extends ActionState{

    onUpdate() {
        if (this._entity._direction == this._entity.direction().right) {

            this._entity.velocity.x += this._entity._ACCELERATION_X;
        } else {

            this._entity.velocity.x -= this._entity._ACCELERATION_X;
        }
        if(this._entity.velocity.y > 0){
            
            this._entity.changeActionStateTo.fall();
        }
    }

    onInput(keyDown) {
        if (keyDown[this._entity._interalKeys.left]) {

            this._entity._direction = this._entity.direction().left;
        } else if (keyDown[this._entity._interalKeys.right]) {

            this._entity._direction = this._entity.direction().right;
        } else if (!keyDown[this._entity._interalKeys.left] && !keyDown[this._entity._interalKeys.right]) {

            if (this._entity.velY == 0) {
                this._entity.changeActionStateTo.stand();;
            }
        }
        if (keyDown[this._entity._interalKeys.jump]) {
            this._entity.changeActionStateTo.jump();;
        }

    }

    animate() {
        if (this._entity._direction == this._entity.direction().right) {

            if (this._entity._sprites.id !== 2) {

                this._entity._sprites = this._entity.spriteSets(2);
            }
        } else {
            if (this._entity._sprites.id !== 3) {

                this._entity._sprites = this._entity.spriteSets(3);
            }
        }
    }
}