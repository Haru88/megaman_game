class Stand extends ActionState{

    onUpdate() {
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
        }
    }

    animate() {
        const e = this._entity;
        e._sprites = e.spriteSets(e.headRight ? 0 : 1);
    }
}