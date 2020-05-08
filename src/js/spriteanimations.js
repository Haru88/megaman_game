class SpriteAnimations {

    constructor(id, gImg, tw, th, ...keyframes) {

        this._id = id;
        this._gImg = gImg;
        this._tw = tw;
        this._th = th;
        this._keyframes = keyframes;
        this._animationframe = 0;
        this._currentKeyFrame = this._keyframes[0];
        this._index = 0;
    }

    nextSprite() {

        this._animationframe++;
        if (this._animationframe % this._keyframes[this._index].duration === 0) {
            this._index = (this._index + 1) % this._keyframes.length;
        }
        this._currentKeyFrame = this._keyframes[this._index];
    }

    draw(posX, posY) {
        return [this._gImg.core, ...this._currentKeyFrame.data, this._tw, this._th, posX, posY, this._tw, this._th]
    }

    get id() {
        return this._id;
    }
}