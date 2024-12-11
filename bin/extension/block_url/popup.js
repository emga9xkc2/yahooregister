document.addEventListener("DOMContentLoaded", restoreOptions);

function restoreOptions() {
  document.querySelector("#input").value = localStorage.getItem("input");
}

function runOptions() {
  localStorage.setItem("input", document.querySelector("#input").value);
  localStorage.setItem("action", "run");
}
function stopOptions() {
  localStorage.setItem("action", "stop");
}

document.querySelector("#btnRun").addEventListener("click", runOptions);

document.querySelector("#btnStop").addEventListener("click", stopOptions);
