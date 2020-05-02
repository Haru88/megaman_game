class DebugTileMarker {

    constructor(w,h) {
        this.w = w;
        this.h = h;
        this.marker = new Map();
    }

    add(name) {
        this.marker.set(name, { x: 0, y: 0});
    }

    get(name) {
        if(!this.marker.has(name)){
            this.add(name);
        }
        return this.marker.get(name);
    }

    clear(){
        this.marker = new Map();
    }

    drawEach(context, sx, sy) {

        [...this.marker.values()].forEach(v => {
            
            context.strokeStyle = "rgb(255,0,0";
            context.strokeRect(v.x + sx, v.y + sy, this.w, this.h);
        });
    }
}