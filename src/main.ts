import { parseCheatsheet } from "./parser.js";
import { renderCheatsheet } from "./renderer.js";
import "./style.css";
import mdText from "../cheatsheet.md?raw";

const originalText = mdText;
let editorText = originalText;
let isEditMode = false;

const app = document.querySelector<HTMLDivElement>("#app")!;
const editorPane = document.getElementById("editor-pane")!;
const previewPane = document.getElementById("preview-pane")!;
const editor = document.getElementById("editor") as HTMLTextAreaElement;
const editToggle = document.getElementById("edit-toggle")!;
const resetBtn = document.getElementById("reset-btn")!;
const dropHint = document.getElementById("drop-hint")!;

function render(text: string) {
  const cheatsheet = parseCheatsheet(text);
  app.innerHTML = renderCheatsheet(cheatsheet);
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

function toggleEditMode() {
  isEditMode = !isEditMode;
  if (isEditMode) {
    editor.value = editorText;
    editorPane.style.display = "block";
    previewPane.classList.add("with-editor");
    editToggle.textContent = "Close";
    resetBtn.style.display = "inline-block";
    dropHint.textContent = "Editing in-memory — refresh page to restore file";
    editor.focus();
  } else {
    editorPane.style.display = "none";
    previewPane.classList.remove("with-editor");
    editToggle.textContent = "Edit";
    resetBtn.style.display = "none";
    dropHint.textContent = "Drop a .md file anywhere to load it";
  }
}

function resetToOriginal() {
  const confirmed = confirm("Discard all changes and reset to the original file content?");
  if (!confirmed) return;
  editorText = originalText;
  editor.value = editorText;
  render(editorText);
}

let debounceTimer: ReturnType<typeof setTimeout>;
function onEditorInput() {
  editorText = editor.value;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    render(editorText);
  }, 100);
}

function handleDrop(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();

  const files = e.dataTransfer?.files;
  if (!files || files.length === 0) return;

  const file = files[0];
  if (!file.name.endsWith(".md")) {
    alert("Please drop a .md file");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target?.result as string;
    if (text) {
      editorText = text;
      if (!isEditMode) {
        toggleEditMode();
      } else {
        editor.value = editorText;
      }
      render(editorText);
    }
  };
  reader.readAsText(file);
}

function setupDragAndDrop() {
  document.addEventListener("dragover", (e) => {
    e.preventDefault();
    document.body.classList.add("drag-over");
  });
  document.addEventListener("dragleave", (e) => {
    e.preventDefault();
    document.body.classList.remove("drag-over");
  });
  document.addEventListener("drop", (e) => {
    document.body.classList.remove("drag-over");
    handleDrop(e);
  });
}

editToggle.addEventListener("click", toggleEditMode);
resetBtn.addEventListener("click", resetToOriginal);
editor.addEventListener("input", onEditorInput);

render(originalText);
setupDragAndDrop();

if (import.meta.hot) {
  import.meta.hot.accept("../cheatsheet.md?raw", (newModule) => {
    if (newModule && !isEditMode) {
      editorText = newModule.default;
      render(editorText);
    }
  });
}
