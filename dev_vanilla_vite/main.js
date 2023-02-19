import "./common.css";
/* import { Canvas } from "./src/canvas";
import { Path } from "./src/path";

const BoardCanvas = new Canvas({
    width: window.innerWidth,
    height: window.innerHeight,
});

const shape = new Path();
shape
    .setupColor({
        background: "#a00",
    })
    .setupRect({
        x: 0,
        y: 0,
        width: 50,
        height: 50,
    });

BoardCanvas.context.fill(shape.path);

const $app = document.getElementById("app");
$app.append(BoardCanvas.$canvas);

BoardCanvas.$canvas.addEventListener("mousedown", function (event) {
    const a = BoardCanvas.context.isPointInPath(
        shape.path,
        event.offsetX,
        event.offsetY
    );
    console.log(a);
});

BoardCanvas.$canvas.addEventListener("mousemove", function (event) {
    const { offsetX, offsetY } = event;
    const p = new Path();
    p.setupColor({ background: "#a00" }).setupRect({
        x: offsetX,
        y: offsetY,
        width: 50,
        height: 50,
    });
    BoardCanvas.resetCanvas();
    BoardCanvas.context.fill(p.path);
}); */
// 다 만들고 나서 Path 로 이동
// 도형 그릴 땐 새로운 Canvas (움직일때도)
