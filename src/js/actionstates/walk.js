class Walk extends ActionState{

    onUpdate() {
        const e = this._entity;
        if (e.headRight) {
            e.velocity.x += e._ACCELERATION_X;
        } else {
            e.velocity.x -= e._ACCELERATION_X;
        }
        if(e.velocity.y > 0){
            e.changeActionStateTo.fall();        
        }
    }

    onInput(keyDown) {
        const e = this._entity;
        if (keyDown[e._interalKeys.left]) {
            e._direction = e.direction().left;
        } else if (keyDown[e._interalKeys.right]) {
            e._direction = e.direction().right;
        } else if (!keyDown[e._interalKeys.left] && !keyDown[e._interalKeys.right]) {
            if (e.velY == 0) {
                e.changeActionStateTo.stand();;
            }
        }
        if (keyDown[e._interalKeys.jump] && !keyDown[e._interalKeys.jump].pressed) {
            keyDown[e._interalKeys.jump].pressed = true;
            e.changeActionStateTo.jump();
        }
    }

    animate() {
        const e = this._entity;
        if (e.headRight) {
            if (e._sprites.id !== 2) {
                e._sprites = e.spriteSets(2);
            }
        } else {
            if (e._sprites.id !== 3) {
                e._sprites = e.spriteSets(3);
            }
        }
    }
}