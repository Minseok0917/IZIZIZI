import "./assets/scss/common.scss";
import "./assets/scss/tailwind.scss";
import { renderTooltip } from "./components/Tooltip";

const $app = document.getElementById("app") as HTMLDivElement;

renderTooltip($app);
