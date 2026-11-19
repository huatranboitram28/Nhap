const STORAGE_KEY = "my_web_marks_and_notes";

function loadState() {
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (err) {
    saved = {};
  }

  document.querySelectorAll(".item").forEach((item) => {
    const id = item.dataset.id;
    const data = saved[id] || { marked: false, note: "" };

    const cb = item.querySelector(".mark-cb");
    const noteEl = item.querySelector(".note-input");

    cb.checked = Boolean(data.marked);
    noteEl.value = data.note || "";
    item.classList.toggle("marked", Boolean(data.marked));
  });
}

function saveState() {
  const state = {};
  document.querySelectorAll(".item").forEach((item) => {
    const id = item.dataset.id;
    const marked = item.querySelector(".mark-cb").checked;
    const note = item.querySelector(".note-input").value;
    state[id] = { marked, note };
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

document.querySelectorAll(".item").forEach((item) => {
  const cb = item.querySelector(".mark-cb");
  const noteEl = item.querySelector(".note-input");

  cb.addEventListener("change", () => {
    item.classList.toggle("marked", cb.checked);
    saveState();
  });

  noteEl.addEventListener("input", saveState);
});

const clearBtn = document.getElementById("clear-btn");
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    loadState();
  });
}

loadState();
