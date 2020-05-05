class Fall extends ActionState {

    onUpdate() { 
       if(this._entity.velocity.y == 0){

        this._entity._resources.get("landSound").play();

            if (this._entity.velocity.x != 0) {
                this._entity.changeActionStateTo.walk();
            } else {
                this._entity.changeActionStateTo.stand();;
            }
        }
    }

    onInput(keyDown) {
        if (keyDown[this._entity._interalKeys.left]) {
            
            this._entity._direction = this._entity.direction().left;
            this._entity.velocity.x -= this._entity._ACCELERATION_X;
        } else if (keyDown[this._entity._interalKeys.right]) {

            this._entity._direction = this._entity.direction().right;
            this._entity.velocity.x += this._entity._ACCELERATION_X;
        }
    }
    d
    animate() {
        if (this._entity._direction == this._entity.direction().right) {
            if (this._entity._sprites.id !== 4) {
                this._entity._sprites = this._entity._spriteAnimations(4);
            }
        } else {
            if (this._entity._sprites.id !== 5) {
                this._entity._sprites = this._entity._spriteAnimations(5);
            }
        }
    }
}