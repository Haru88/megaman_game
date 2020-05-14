class Dash extends ActionState{

    onInit(){
        const e = this._entity;
        this._DASHACCELERATION = e._ACCELERATION_X*3;
        e._resources.get("slideSound").play();
    }

    onInput(keyDown){
        const e = this._entity;
        if (e.velocity.y == 0 && keyDown[e._interalKeys.jump] && !keyDown[e._interalKeys.jump].pressed) {
            keyDown[e._interalKeys.jump].pressed = true;
            //e.velocity.x += this._DASHACCELERATION * 8;
            e.changeActionStateTo.jump();
        }
    }

    onUpdate(){
        const e = this._entity;
        if(this._tickCounter < 10){
            if (e.headRight) {e
                if (e._sprites.id !== 8) {
                    e.velocity.x += this._DASHACCELERATION;
                    e._sprites = e.spriteSets(8);
                }
            } else {
                if (e._sprites.id !== 9) {
                    e.velocity.x -= this._DASHACCELERATION;
                    e._sprites = e.spriteSets(9);
                } 
            }
        }

        ++this._tickCounter;
        if (e.velocity.y < 0){
            e.changeActionStateTo.fall();
        }
        if(Math.abs(e.velocity.x) <= 1){
            e.changeActionStateTo.stand();
        }
    }
}