const counterEl = document.getElementById("counter");
const editorEl = document.getElementById("editor");
const inputEl = document.getElementById("counterInput");
const cancelEditorEl = document.getElementById("cancelEditor");
const labelEl = document.querySelector(".counter-label");

const STORAGE_KEY = "secret-counter-value";
let currentValue = Number(localStorage.getItem(STORAGE_KEY) || 1250);
let tapCount = 0;
let tapTimer;

function formatValue(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function renderCounter() {
  counterEl.textContent = formatValue(currentValue);
  animateCounter();
}

function animateCounter() {
  counterEl.classList.remove("animate");
  void counterEl.offsetWidth;
  counterEl.classList.add("animate");
}

function randomStep() {
  const roll = Math.random();
  if (roll < 0.7) return 1;
  if (roll < 0.9) return 2;
  return 3;
}

function startCounter() {
  setInterval(() => {
    currentValue += randomStep();
    renderCounter();
    localStorage.setItem(STORAGE_KEY, String(currentValue));
  }, 1200 + Math.random() * 900);
}

function showEditor() {
  editorEl.classList.add("show");
  inputEl.value = currentValue;
  inputEl.focus();
  inputEl.select();
}

function hideEditor() {
  editorEl.classList.remove("show");
}

cancelEditorEl.addEventListener("click", hideEditor);

editorEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const nextValue = Number(inputEl.value);
  if (!Number.isNaN(nextValue) && nextValue >= 0) {
    currentValue = nextValue;
    renderCounter();
    localStorage.setItem(STORAGE_KEY, String(currentValue));
  }

  hideEditor();
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "e") {
    event.preventDefault();
    showEditor();
  }

  if (event.key === "Escape") {
    hideEditor();
  }
});

labelEl.addEventListener("click", () => {
  tapCount += 1;

  clearTimeout(tapTimer);
  tapTimer = setTimeout(() => {
    tapCount = 0;
  }, 800);

  if (tapCount === 5) {
    tapCount = 0;
    showEditor();
  }
});

renderCounter();
startCounter();