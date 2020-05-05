class Jump extends ActionState{

    onInit(){
        this._entity._resources.get("jumpSound").play();
        this._entity.velocity.y = -this._entity._ACCELERATION_Y;
    }

    onUpdate(){
        if(this._entity.velocity.y == 0){

            this._entity.changeActionStateTo.fall();
        }
    }

    onInput(keyDown){
        if (keyDown[this._entity._interalKeys.left]) {

            this._entity._direction = this._entity.direction().left;
            this._entity.velocity.x -= this._entity._ACCELERATION_X;  

        } else if (keyDown[this._entity._interalKeys.right]) {

            this._entity._direction = this._entity.direction().right;
            this._entity.velocity.x += this._entity._ACCELERATION_X;

        }
    }
d
    animate(){
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