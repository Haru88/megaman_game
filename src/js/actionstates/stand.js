class Stand extends ActionState{

    onUpdate() {
        ++this._tickCounter;
        const e = this._entity;
        if(e.velocity.y > 0){
            e.changeActionStateTo.fall();
        }
    }

    onInput(keyDown) {
        const e = this._entity;
        if (keyDown[e._interalKeys.left]) {
            e._direction = e.direction().left;
            e.changeActionStateTo.walk();
        } else if (keyDown[e._interalKeys.right]) {
            e._direction = e.direction().right;
            e.changeActionStateTo.walk();
        } else if (keyDown[e._interalKeys.jump] && !keyDown[e._interalKeys.jump].pressed) {
            keyDown[e._interalKeys.jump].pressed = true;
            e.changeActionStateTo.jump();
        } else if (this._tickCounter > 10 && keyDown[e._interalKeys.dash] && !keyDown[e._interalKeys.dash].pressed) {
            keyDown[e._interalKeys.dash].pressed = true;
            //e.changeActionStateTo.dash();
        }
    }

    animate() {
        const e = this._entity;
        e._sprites = e.spriteSets(e.headRight ? 0 : 1);
    }
}