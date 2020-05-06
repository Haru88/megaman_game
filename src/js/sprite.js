class Sprite{

    constructor(sx, sy, frametime){

        this._sx = sx;
        this._sy = sy;
        this._frametime = frametime;
    }

    get data(){
        return [this._sx, this._sy]
    }

    get frameTime(){
        return this._frametime;
    }
}