class Tile extends Entities{

    constructor(name, x, y, width, height, resources) {
        super(name, x, y, width, height, resources);
        this._solid = false;
        this._jumpThrough = false;
    }

    set solid(bool){
        this._solid = bool;
    }

    set jumpThrough(bool){
        this._jumpThrough = bool;
    }

    get isSolid(){
        return this._solid;
    }

    get isJumpThrough(){
        return this._jumpThrough;
    }

    hasSprite(){
        //return this._img;
        return this._solid;
    }
}