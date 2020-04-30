class DebugTileMarker {

    constructor(w,h) {
        this.w = w;
        this.h = h;
        this.marker = new Map();
    }

    add(name) {
        this.marker.set(name, { x: 0, y: 0});
        console.log(this.marker);
    }

    get(name) {
        if(!this.marker.has(name)){
            this.add(name);
        }
        return this.marker.get(name);
    }

    drawEach(context, sx, sy) {

        [...this.marker.values()].forEach(v => {
            context.fillStyle = "rgb(255,0,0";
            context.strokeRect(v.x + sx, v.y + sy, this.w, this.h);
        });
    }
}