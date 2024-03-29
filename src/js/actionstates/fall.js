class Fall extends ActionState {

    onUpdate() {
        const e = this._entity;
        if (e.velocity.y == 0) {
            e._resources.get("landSound").play();
            if (e.velocity.x != 0) {
                e.changeActionStateTo.walk();
            } else {
                e.changeActionStateTo.stand();;
            }
        }
    }

    onInput(keyDown) {
        const e = this._entity;
        if (keyDown[e._interalKeys.left]) {
            e._direction = e.direction().left;
            e.velocity.x -= e._currAccelerationX;
        } else if (keyDown[e._interalKeys.right]) {
            e._direction = e.direction().right;
            e.velocity.x += e._currAccelerationX;
        }
        if(keyDown[e._interalKeys.jump]){
            keyDown[e._interalKeys.jump].pressed = true;
        }
    }

    animate() {
        const e = this._entity;
        if (e.headRight) {
            if (e._sprites.id !== 6) {
                e._sprites = e.spriteSets(6);
            }
        } else {
            if (e._sprites.id !== 7) {
                e._sprites = e.spriteSets(7);
            } 
        }
    }
}