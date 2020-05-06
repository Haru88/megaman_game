class SpriteAnimations {

    constructor(id, img, tw, th, ...frames) {

        this._id = id;
        this._img = img;
        this._tw = tw;
        this._th = th;
        this._frames = frames;
        this._currentFrame = 0;
        this._currFrame = this._frames[0];
        this._frameCnt = 0;
    }

    nextSprite() {

        this._currentFrame++;
        if (this._currentFrame % this._frames[this._frameCnt].frameTime === 0) {
            this._frameCnt = (this._frameCnt + 1) % this._frames.length;
        }
        this._currFrame = this._frames[this._frameCnt];
    }

    draw(x, y) {
        return [this._img, ...this._currFrame.data, this._tw, this._th, x, y, this._tw, this._th]
    }

    get id() {
        return this._id;
    }
}