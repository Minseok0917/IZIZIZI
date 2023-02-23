import { $, $$ } from "./modules/element.js";
import { stores } from "./store/index.js";
import { setupCoreCanvas, setupExcuteCanvas } from "./setup/setupCanvas.js";
import { setupToolBox, setupToolItem } from "./setup/setupToolBox.js";

const $app = document.getElementById("app");
setupToolBox();
setupToolItem();
setupCoreCanvas($app);
setupExcuteCanvas($app);

const $rect = $('.tool-item[data-shape="rect"]');
const $circle = $('.tool-item[data-shape="circle"]');
// $circle.click();

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
