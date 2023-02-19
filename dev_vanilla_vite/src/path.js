export class Path {
    constructor() {
        this.path = new Path2D();
    }
    setupRect({ x, y, width, height }) {
        this.path.rect(x, y, width, height);
        return this;
    }
    setupArc({ x, y, redius }) {
        this.path.arc(x, y, redius, 0, Math.PI * 2);
        return this;
    }
    setupColor({ background, stroke }) {
        const { path } = this;
        background && (path.fillStyle = background);
        stroke && (path.strokeStyle = stroke);
        return this;
    }
}

export class PathRect extends Path {
    constructor({ x, y, width, height }) {
        this.setupRect({ x, y, width, height });
    }
}
