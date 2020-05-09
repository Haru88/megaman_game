class SpriteAnimations {

    constructor(id, gImg,...keyframes) {

        this._id = id;
        this._gImg = gImg;
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
        return [this._gImg.canvas, ...this._gImg.get(...this._currentKeyFrame.data), ...this._gImg.tileSize, posX, posY, ...this._gImg.tileSize]
    }

    get id() {
        return this._id;
    }
}