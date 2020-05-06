class Stand extends ActionState{

    onUpdate() {
        if(this._entity.velocity.y > 0){
            
            this._entity.changeActionStateTo.fall();
        }
    }

    onInput(keyDown) {
        
        if (keyDown[this._entity._interalKeys.left]) {

            this._entity._direction = this._entity.direction().left;
            this._entity.changeActionStateTo.walk();

        } else if (keyDown[this._entity._interalKeys.right]) {

            this._entity._direction = this._entity.direction().right;
            this._entity.changeActionStateTo.walk();

        } else if (keyDown[this._entity._interalKeys.jump]) {

            this._entity.changeActionStateTo.jump();
        }
    }

    animate() {
        this._entity._sprites = this._entity.spriteSets(this._entity._direction == this._entity.direction().right ? 0 : 1);
    }
}