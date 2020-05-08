class Sprite{

    constructor(sx, sy, duration){

        this._sx = sx;
        this._sy = sy;
        this._duration = duration;
    }

    get data(){
        return [this._sx, this._sy]
    }

    get duration(){
        return this._duration;
    }
}