class SpriteAnimations{

    constructor(id, ...frames){

        this._id = id;
        this._frames = frames;
        this._currentFrame = 0;
        this._frameCnt = 0;
    }

    get nextSprite(){

        this._currentFrame++;
        if(this._currentFrame % this._frames[this._frameCnt].frameTime === 0){
            this._frameCnt = (this._frameCnt + 1) % this._frames.length;
        }
        return this._frames[this._frameCnt];
    }

    get id(){
        return this._id;
    }
}