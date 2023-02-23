export class Canvas {
    $canvas = document.createElement("canvas");
    context = this.$canvas.getContext("2d");
    constructor({ id, className }) {
        this.initCanvasSize();
        Object.assign(this.$canvas, { id, className });
    }
    get canvasWidth() {
        return this.$canvas.width;
    }
    get canvasHeight() {
        return this.$canvas.height;
    }
    initCanvasSize() {
        this.$canvas.width = window.innerWidth;
        this.$canvas.height = window.innerHeight;
    }
    show() {
        this.$canvas.classList.remove("none");
    }
    hide() {
        this.$canvas.classList.add("none");
    }
    clearAll() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        return this;
    }
    setColor({ background, stroke }) {
        const { context } = this;
        background && (context.fillStyle = background);
        stroke && (context.strokeStyle = stroke);
        return this;
    }
    strokeStyle(color) {
        this.context.strokeStyle = color;
        return this;
    }
    stroke(path) {
        this.context.stroke(path);
        return this;
    }
}

export class ResizeCanvas extends Canvas {
    constructor(canvasOptions) {
        super(canvasOptions);
        window.addEventListener("resize", this.initCanvasSize);
    }
}

class Path {
    path = new Path2D();
}
export class RoundRectPath extends Path {
    constructor({ x, y, width, height, radii }) {
        super();
        this.path.roundRect(x, y, width, height, radii);
    }
}
export class EllipsePath extends Path {
    constructor({ x, y, width, height }) {
        super();
        this.path.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
    }
}

/* 
    path
        addPath
        closePath
        moveTo
        lineTo
        bezierCurveTo
        quadraticCurveTo
        arc
        arcTo
        ellipse
        rect
        roundRect
*/
