class ActionState{

    constructor(entity){
        this._entity = entity;
        this._tickCounter = 0;
        this.onInit();
    }

    onInit(){
        return;
    }

    onUpdate() {
        return;
    }

    onInput() {
        ++this._tickCounter;
        return;
    }

    animate() {
        return;
    }

}