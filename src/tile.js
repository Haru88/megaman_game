class Tile extends Entities{

    constructor(name, x, y, width, height, resources) {
        super(name, x, y, width, height, resources);
        this._solid = false;
    }

    set solid(bool){
        this._solid = bool;
    }

    get isSolid(){
        return this._solid;
    }

    hasSprite(){
        //return this._img;
        return this._solid;
    }
}