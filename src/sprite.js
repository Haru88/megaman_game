class Sprite{

    constructor(img, sx, sy, sw, sh, frametime, once = false){

        this._img = img;
        this._sx = sx;
        this._sy = sy;
        this._sw = sw;
        this._sh = sh;
        this._frametime = frametime;
        this._once = once;
    }

    get data(){
        return [this._img, this._sx, this._sy, this._sw, this._sh]
    }

    get frameTime(){
        return this._frametime;
    }
}