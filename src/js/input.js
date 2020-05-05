class Input{

    constructor(...entities){

        this._entities = [];
        this.add(...entities);

        this._keysDown = {};
        this._keysPressed = {};

        window.addEventListener("keydown", e => this._keysDown[e.key.toLowerCase()] = true);
        window.addEventListener("keyup", e => {
            delete this._keysDown[e.key.toLowerCase()];
            delete this._keysPressed[e.key.toLowerCase()];
        });
    }

    add(...entities){
        this._entities.push(...entities);        
    }

    update(){ 
        this._entities.forEach(e => {
            e.input(this._keysDown);   
        });        
    }
}