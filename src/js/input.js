class Input {

    constructor(...entities) {

        this._entities = [];
        this.add(...entities);

        this._keysDown = {};

        window.addEventListener("keydown", e => {
            if (!this._keysDown[e.key.toLowerCase()]) {
                this._keysDown[e.key.toLowerCase()] = new PressedState();
            }
        });
        window.addEventListener("keyup", e => {
            delete this._keysDown[e.key.toLowerCase()];
        });
    }

    add(...entities) {
        this._entities.push(...entities);
    }

    update() {
        this._entities.forEach(e => {
            e.input(this._keysDown);
        });
    }

    keyPressed(key) {
        if (this._keysDown[key] && !this._keysDown[key].pressed) {
            this._keysDown[key].pressed = true;
            return true;
        }
        return false;
    }

    get keysdown() {
        return this._keysDown;
    }
}

class PressedState {
    constructor() {
        this._pressed = false;
    }
    set pressed(bool){
        this._pressed = bool;
    }
    get pressed(){
        return this._pressed;
    }
}

