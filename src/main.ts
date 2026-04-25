import { parseCheatsheet } from "./parser.js";
import { renderCheatsheet } from "./renderer.js";
import "./style.css";
import mdText from "../cheatsheet.md?raw";

function loadAndRender(text: string) {
  const cheatsheet = parseCheatsheet(text);
  const html = renderCheatsheet(cheatsheet);
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = html;
  checkOverflow();
}

function checkOverflow() {
  const page = document.querySelector<HTMLElement>(".cheatsheet-page");
  const warning = document.getElementById("overflow-warning");
  if (!page || !warning) return;
  const maxHeight = 1123;
  if (page.scrollHeight > maxHeight) {
    warning.style.display = "block";
    console.warn(
      `SheetCheater: Content exceeds one A4 page (${page.scrollHeight}px > ${maxHeight}px)`,
    );
  } else {
    warning.style.display = "none";
  }
}

loadAndRender(mdText);

if (import.meta.hot) {
  import.meta.hot.accept("../cheatsheet.md?raw", (newModule) => {
    if (newModule) {
      loadAndRender(newModule.default);
    }
  });
}
