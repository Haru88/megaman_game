class Jump extends ActionState{

    onInit(){
        const e = this._entity;
        e._resources.get("jumpSound").play();
        e.velocity.y = -this._entity._ACCELERATION_Y;
    }

    onUpdate(){
        const e = this._entity;
        if(e.velocity.y == 0){
            e.changeActionStateTo.fall();
        }
    }

    onInput(keyDown){
        const e = this._entity;
        if (keyDown[e._interalKeys.left]) {
            e._direction = e.direction().left;
            e.velocity.x -= e._ACCELERATION_X;
        } else if (keyDown[e._interalKeys.right]) {
            e._direction = e.direction().right;
            e.velocity.x += e._ACCELERATION_X;
        }
    }

    animate(){
        const e = this._entity;
        if (e.headRight) {
            if (e._sprites.id !== 4) {
                e._sprites = e.spriteSets(4);
            }
        } else {
            if (e._sprites.id !== 5) {
                e._sprites = e.spriteSets(5);
            } 
        }
    }   
}