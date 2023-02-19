import { $, $$ } from "./element.js";
import { setupCanvas } from "./canvas.js";
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
        shapes.forEach((shape) => {
            // path2D 로 처리해야됨
            if (shape.shapeType === "rect") {
                boardCanvasConfig.setBeginPath().setColor({ stroke: "#666" }).setRect(shape);
                boardCanvasConfig.context.stroke();
            }
        });
    },
};
const shapeCanvasConfig = setupCanvas($shapeCanvas);
const shapeState = {
    selectedShapeType: null,
    isMouseDown: false,
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
            shapeCanvasConfig.clear().setBeginPath().setColor({ storke: "#aaa" });
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
            }
            shapeCanvasConfig.context.lineWidth = 1;
            shapeCanvasConfig.context.setLineDash([10, 10]);
            shapeCanvasConfig.context.stroke();
        }
    },
    mouseUp() {
        shapeState.isMouseDown = false;
        toolItemServices.toolBoxEventOn();
        shapeCanvasConfig.clear();
        boardState.shapes.push(shapeState.shape);
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
    $shapeCanvas.addEventListener("mousedown", shapeHandler.mouseDown);
    $shapeCanvas.addEventListener("mousemove", shapeHandler.mouseMove);
    $shapeCanvas.addEventListener("mouseup", shapeHandler.mouseUp);
}
setEvent();
