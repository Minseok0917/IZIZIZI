import { Tooltip } from "../think";

HTMLElement.prototype.render = function () {};
const createElement = (element: string, attrs: object = {}) => Object.assign(document.createElement(element), attrs);

const renderTooltipItem = (tooltip: Tooltip) => `
  <div class="tooltip">${tooltip.name}</div>
`;

const _renderTooltipItem = function (tooltip: Tooltip) {
  return createElement("div", {
    className: "tooltip-item",
    onclick() {},
    textContent: tooltip.name,
  });
};

export function renderTooltip($parentElement: HTMLDivElement) {
  const tooltips: Tooltip[] = [
    new Tooltip("선택", `도형을 선택해서 이동 시킬 수 있습니다.`, "1"),
    new Tooltip("사각형", `네모를 그릴 수 있습니다.`, "2"),
    new Tooltip("타원", `원을 그릴 수 있습니다.`, "3"),
  ];

  const $tooltip = createElement("div", {
    className: "tooltip flex gap-2",
    innerHTML: tooltips.map(renderTooltipItem),
  });

  /* const $tooltipItems = tooltips.map(_renderTooltipItem);
  $tooltip.append(...$tooltipItems); */

  $parentElement.append($tooltip);
}
