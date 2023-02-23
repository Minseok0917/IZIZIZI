export function setupCanvas($canvas) {
    const context = $canvas.getContext("2d");
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    $canvas.width = canvasWidth;
    $canvas.height = canvasHeight;
    return {
        $canvas,
        context,
        canvasWidth,
        canvasHeight,
        show() {
            $canvas.classList.remove("none");
        },
        hide() {
            $canvas.classList.add("none");
        },
        clear() {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            return this;
        },
        setBeginPath() {
            context.beginPath();
            return this;
        },
        setMoveTo({ x, y }) {
            context.moveTo(x, y);
            return this;
        },
        setRect({ x, y, width, height }) {
            context.rect(x, y, width, height);
            return this;
        },
        setColor({ background, stroke }) {
            background && (context.fillStyle = background);
            stroke && (context.strokeStyle = stroke);
            return this;
        },
    };
}

function createPath() {
    const path = new Path2D();
    return {
        path,
    };
}

export function createRect({ x, y, width, height }) {
    const { path } = createPath();
    path.rect(x, y, width, height);
    return { path };
}
