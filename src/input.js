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
        //console.log();
        this._entities.push(...entities);        
    }

    update(){
        //if(Object.entries(this._keysDown).length > 0) console.log(this._keysDown);   
        this._entities.forEach(e => {
            //console.log(e);
            e.input(this._keysDown, this._keysPressed);   
        });        
    }
}