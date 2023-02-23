import { stores } from "../store/index.js";
import { ResizeCanvas, RoundRectPath, EllipsePath } from "../modules/canvas.js";
export function setupCoreCanvas($target) {
    const canvasInstance = new ResizeCanvas({
        id: "core-canvas",
        className: "abs",
    });
    const state = {
        shapes: [],
    };
    const services = {
        renderShapes() {
            const { context } = canvasInstance;
            canvasInstance.clearAll();
            state.shapes.forEach((shape) => {
                context.stroke(shape.path);
            });
        },
    };
    const handler = {
        mouseDown() {},
        mouseMove() {},
        mouseUp() {},
    };
    function setEvent() {
        const { $canvas } = canvasInstance;
        $canvas.addEventListener("mousedown", handler.mouseDown);
        $canvas.addEventListener("mousemove", handler.mouseMove);
        $canvas.addEventListener("mouseup", handler.mouseUp);
    }
    setEvent();
    stores.state.coreCanvasConfig = canvasInstance;
    stores.state.coreCanvasState = state;
    stores.services.corecanvasServices = services;
    $target.append(canvasInstance.$canvas);
}
export function setupExcuteCanvas($target) {
    const canvasInstance = new ResizeCanvas({
        id: "excute-canvas",
        className: "abs none",
    });
    const state = {
        isMouseDown: false,
        status: "",
        createDown: {},
        createPath: {},
        isStatus(status) {
            return this.status === status;
        },
    };
    const handler = {
        mouseDown(event) {
            if (state.isStatus("create")) {
                state.isMouseDown = true;
                state.createDown.x = event.offsetX;
                state.createDown.y = event.offsetY;
            }
        },
        mouseMove(event) {
            if (state.isStatus("create") && state.isMouseDown) {
                const { x, y } = state.createDown;
                const { offsetX, offsetY } = event;
                if (stores.state.toolItemState.selectedShape === "rect") {
                    const roundRectPath = new RoundRectPath({
                        x,
                        y,
                        width: offsetX - x,
                        height: offsetY - y,
                        radii: 5,
                    });
                    state.createPath = roundRectPath;
                } else if (stores.state.toolItemState.selectedShape === "circle") {
                    const width = Math.abs(offsetX - x) / 2;
                    const height = Math.abs(offsetY - y) / 2;
                    const ellipsePath = new EllipsePath({
                        x: x + width * (x - offsetX < 0 ? 1 : -1),
                        y: y + height * (y - offsetY < 0 ? 1 : -1),
                        width,
                        height,
                    });
                    state.createPath = ellipsePath;
                }
                canvasInstance
                    .clearAll() //
                    .strokeStyle("#999")
                    .stroke(state.createPath.path);
            }
        },
        mouseUp() {
            if (state.isStatus("create")) {
                canvasInstance.clearAll();
                state.isMouseDown = false;
                stores.state.coreCanvasState.shapes.push(state.createPath);
                stores.services.corecanvasServices.renderShapes();
            }
        },
    };
    function setEvent() {
        const { $canvas } = canvasInstance;
        $canvas.addEventListener("mousedown", handler.mouseDown);
        $canvas.addEventListener("mousemove", handler.mouseMove);
        $canvas.addEventListener("mouseup", handler.mouseUp);
    }
    setEvent();
    stores.state.excuteCanvasConfig = canvasInstance;
    stores.state.excuteCanvasState = state;
    $target.append(canvasInstance.$canvas);
}
