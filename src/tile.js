class Tile extends Entities{

    constructor(x, y, width = 10, height = 10, img) {
        super(x, y, width, height);
        this._solid = false;
        this._img = img;
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