import { stores } from "../store/index.js";
import { $, $$ } from "../modules/element.js";
export function setupToolBox() {
    const $toolBox = $(".tool-box");
    const services = {
        toolBoxEventOn() {
            $toolBox.classList.remove("event-none");
        },
        toolBoxEventOff() {
            $toolBox.classList.add("event-none");
        },
    };
    stores.state.toolBoxServices = services;
}
export function setupToolItem() {
    const $toolItems = $$(".tool-box > .tool-item");
    const state = {
        selectedShape: "",
    };
    const services = {
        toggle(selectedShapeType) {
            $toolItems.forEach(($toolItem) => {
                const shapeType = $toolItem.dataset.shape;
                if (selectedShapeType === shapeType) {
                    if ($toolItem.classList.toggle("selected")) {
                        stores.state.excuteCanvasConfig.show();
                        stores.state.excuteCanvasState.status = "create";
                        state.selectedShape = selectedShapeType;
                    } else {
                        stores.state.excuteCanvasConfig.hide();
                        state.selectedShape = "";
                    }
                } else {
                    $toolItem.classList.remove("selected");
                }
            });
        },
    };
    const hanlder = {
        click() {
            const shapeType = this.dataset.shape;
            services.toggle(shapeType);
        },
    };
    function setEvent() {
        $toolItems.forEach(($toolItem) => {
            $toolItem.addEventListener("click", hanlder.click);
        });
    }
    setEvent();
    stores.state.toolItemState = state;
}
