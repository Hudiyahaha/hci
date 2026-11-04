import { SERVICE_DATA } from "./content/service-data.js";
import { buildMessage } from "./lib/message.js";
import { screenForHash } from "./router.js";
import { loadFailedScreen } from "./screens/decision.js";

const ERROR_NO_QUESTION = "Choose at least one question, or write your own, so your message has something to ask.";
const LOAD_DELAY_MS = 700;

const app = document.getElementById("app");
const statusEl = document.getElementById("status");

// Nothing here is written to storage. It is cleared when the page reloads.
const state = { selected: [], custom: "", message: "" };

let data = null;
let loadFailed = false;
// Add ?fail=1 to the address to demonstrate the failed load state once.
let simulateFailure = new URLSearchParams(window.location.search).get("fail") === "1";

function render(moveFocus) {
  if (!data && !loadFailed) return;
  const screen = loadFailed
    ? loadFailedScreen()
    : screenForHash(window.location.hash, { data, state });
  document.title = `Next steps guide: ${screen.title}`;
  app.innerHTML = screen.html;
  if (moveFocus) {
    app.querySelector("h1")?.focus();
    window.scrollTo(0, 0);
  }
}

// Simulates fetching service details, because no real service feed exists.
function load(moveFocus) {
  data = null;
  loadFailed = false;
  app.innerHTML = "";
  statusEl.textContent = "Loading service details...";
  if (moveFocus) statusEl.focus();
  window.setTimeout(() => {
    statusEl.textContent = "";
    if (simulateFailure) {
      simulateFailure = false;
      loadFailed = true;
      render(true);
      return;
    }
    data = SERVICE_DATA;
    render(moveFocus);
  }, LOAD_DELAY_MS);
}

function setFormError(text) {
  const error = document.getElementById("form-error");
  if (!error) return;
  error.textContent = text;
  app.querySelectorAll("fieldset").forEach((group) => group.classList.toggle("invalid", Boolean(text)));
}

async function copyMessage() {
  const status = document.getElementById("copy-status");
  const box = document.getElementById("message");
  status.textContent = "";
  status.className = "status";
  try {
    await navigator.clipboard.writeText(state.message);
    status.classList.add("status-success");
    status.textContent = "Copied. Nothing has been sent.";
  } catch {
    box.focus();
    box.select();
    status.classList.add("status-warning");
    status.textContent = "Couldn't copy automatically. The message is selected, so press Ctrl+C to copy it.";
  }
}

app.addEventListener("click", (event) => {
  const action = event.target.getAttribute("data-action");
  if (action === "copy") copyMessage();
  if (action === "retry") load(true);
});

app.addEventListener("change", (event) => {
  const id = event.target.getAttribute("data-question");
  if (id === null) return;
  state.selected = state.selected.filter((item) => item !== id);
  if (event.target.checked) state.selected.push(id);
  setFormError("");
});

app.addEventListener("input", (event) => {
  if (event.target.id === "custom") {
    state.custom = event.target.value;
    setFormError("");
  }
});

app.addEventListener("submit", (event) => {
  event.preventDefault();
  state.message = buildMessage(state.selected, state.custom);
  if (!state.message) {
    setFormError(ERROR_NO_QUESTION);
    app.querySelector("input[type=checkbox]").focus();
    return;
  }
  window.location.hash = "#message";
});

window.addEventListener("hashchange", () => render(true));

load(false);
