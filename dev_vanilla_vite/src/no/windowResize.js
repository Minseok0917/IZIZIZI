export let windowWidth = window.innerWidth;
export let windowHeight = window.innerHeight;

function setResize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
}
window.addEventListener("resize", setResize);
setResize();
