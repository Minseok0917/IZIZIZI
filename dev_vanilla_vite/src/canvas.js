export class Canvas {
    constructor({ width, height }) {
        this.$canvas = document.createElement("canvas");
        this.context = this.$canvas.getContext("2d");
        this.setCanvasWH({ width, height });
    }
    setCanvasWH({ width, height }) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.changeCanvasWH();
    }
    changeCanvasWH() {
        const { $canvas, canvasWidth, canvasHeight } = this;
        $canvas.width = canvasWidth;
        $canvas.height = canvasHeight;
    }
    resetCanvas() {
        const { context, canvasWidth, canvasHeight } = this;
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    }
}
