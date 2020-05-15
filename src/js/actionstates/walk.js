class Walk extends ActionState{

    onUpdate() {
        ++this._tickCounter;
        const e = this._entity;
        if (e.headRight) {
            e.velocity.x += e._currAccelerationX;
        } else {
            e.velocity.x -= e._currAccelerationX;
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
        if (this._tickCounter > 10 && keyDown[e._interalKeys.dash] && !keyDown[e._interalKeys.dash].pressed) {
            keyDown[e._interalKeys.dash].pressed = true;
            e.changeActionStateTo.dash();
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