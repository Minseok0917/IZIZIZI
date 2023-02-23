import { $, $$ } from "./element.js";
import { setupCanvas, createRect } from "./canvas.js";
const $boardCanvas = document.getElementById("canvas-board");
const $shapeCanvas = document.getElementById("canvas-shape");
const boardCanvasConfig = setupCanvas($boardCanvas);
const boardState = {
    shapes: [],
};
const boardServices = {
    shapesRender() {
        const { shapes } = boardState;
        boardCanvasConfig.clear();
        shapeCanvasConfig.clear();
        shapes.forEach((shape) => {
            // path2D 로 처리해야됨
            if (shape.state.isEdit) {
                shapeCanvasConfig.show();
                shapeCanvasConfig.setBeginPath().setColor({ stroke: "#999" });
                shapeCanvasConfig.setRect(shape.state);
                shapeCanvasConfig.context.lineWidth = 0.5;
                shapeCanvasConfig.context.setLineDash([5, 5]);
                shapeCanvasConfig.context.stroke();
            } else {
                boardCanvasConfig.context.stroke(shape.path);
            }
        });
    },
    findShape({ x, y }) {
        const { context } = boardCanvasConfig;
        return boardState.shapes.find((shape) => context.isPointInPath(shape.path, x, y));
    },
    findAllShape({ x, y }) {
        const { context } = boardCanvasConfig;
        return boardState.shapes.filter((shape) => context.isPointInPath(shape.path, x, y));
    },
};
const boardHandler = {
    mouseDown(event) {
        if (boardCanvasConfig.$canvas.classList.contains("cursor-move")) {
            const findShape = boardServices.findShape({ x: event.offsetX, y: event.offsetY });
            findShape.state.isEdit = true;
            shapeState.isEdit = true;
            boardServices.shapesRender();
        }
    },
    mouseMove(event) {
        const { context } = boardCanvasConfig;
        const { offsetX: x, offsetY: y } = event;
        const limit = 15;
        const datas = context.getImageData(x - limit, y - limit, limit, limit);
        if (datas.data.every((n) => n === 0)) {
            boardCanvasConfig.$canvas.classList.remove("cursor-move");
        } else {
            boardCanvasConfig.$canvas.classList.add("cursor-move");
        }
    },
};
const shapeCanvasConfig = setupCanvas($shapeCanvas);
const shapeState = {
    selectedShapeType: null,
    isMouseDown: false,
    isEdit: false,
    downPos: {
        x: null,
        y: null,
    },
    shape: {},
};
const shapeHandler = {
    mouseDown(event) {
        shapeState.isMouseDown = true;
        toolItemServices.toolBoxEventOff();
        shapeState.downPos.x = event.offsetX;
        shapeState.downPos.y = event.offsetY;
    },
    mouseMove(event) {
        if (shapeState.isMouseDown) {
            const { downPos } = shapeState;
            const { offsetX, offsetY } = event;
            const { selectedShapeType } = shapeState;
            shapeCanvasConfig.clear().setBeginPath().setColor({ stroke: "#999" });
            if (selectedShapeType === "rect") {
                const rect = {
                    x: downPos.x,
                    y: downPos.y,
                    width: offsetX - downPos.x,
                    height: offsetY - downPos.y,
                };
                shapeState.shape = { shapeType: selectedShapeType, ...rect };
                shapeCanvasConfig.setRect(rect);
            } else if (selectedShapeType === "circle") {
                const arc = {
                    x: downPos.x,
                    y: downPos.y,
                };
            }
            shapeCanvasConfig.context.lineWidth = 0.5;
            shapeCanvasConfig.context.setLineDash([5, 5]);
            shapeCanvasConfig.context.stroke();
        }
    },
    mouseUp() {
        if (shapeState.isEdit) return;
        const { path } = createRect(shapeState.shape);
        shapeState.isMouseDown = false;
        toolItemServices.toolBoxEventOn();
        shapeCanvasConfig.clear();
        boardState.shapes.push({ state: { ...shapeState.shape, isEdit: false }, path });
        boardServices.shapesRender();
    },
};
const $toolBox = $(".tool-box");
const $toolItems = $$(".tool-item");
const toolItemLists = ["rect", "circle"];
const toolItemServices = {
    shouldShape(shapeType) {
        return toolItemLists.includes(shapeType);
    },
    clickToggle($selectedToolItem) {
        shapeCanvasConfig.show();
        $toolItems.forEach(($toolItem) => {
            const isSameToolItem = $selectedToolItem === $toolItem;
            if (isSameToolItem) {
                const hasSelected = $toolItem.classList.contains("selected");
                hasSelected && shapeCanvasConfig.hide();
                $toolItem.classList.toggle("selected");
                shapeState.selectedShapeType = $toolItem.dataset.shape;
            } else {
                $toolItem.classList.remove("selected");
            }
        });
    },
    toolBoxEventOn() {
        $toolBox.classList.remove("event-none");
    },
    toolBoxEventOff() {
        $toolBox.classList.add("event-none");
    },
};
const toolItemHandler = {
    click() {
        const shapeType = this.dataset.shape;
        const shouldShape = toolItemServices.shouldShape(shapeType);
        shouldShape && toolItemServices.clickToggle(this);
    },
};

function setEvent() {
    $toolItems.forEach(($toolItem) => $toolItem.addEventListener("click", toolItemHandler.click));
    $boardCanvas.addEventListener("mousedown", boardHandler.mouseDown);
    $boardCanvas.addEventListener("mousemove", boardHandler.mouseMove);
    $shapeCanvas.addEventListener("mousedown", shapeHandler.mouseDown);
    $shapeCanvas.addEventListener("mousemove", shapeHandler.mouseMove);
    $shapeCanvas.addEventListener("mouseup", shapeHandler.mouseUp);
}
setEvent();
