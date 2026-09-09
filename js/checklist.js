"use strict";
const checks = Array.from(document.querySelectorAll(".checklist input"));
const status = document.getElementById("check-status");
const reset = document.getElementById("reset-checklist");
function update() {
  const done = checks.filter((input) => input.checked).length;
  status.textContent =
    done === checks.length
      ? "已核对全部 6 项。接下来按自己的需求选择短期试用。"
      : `已核对 ${done} / ${checks.length} 项`;
}
checks.forEach((input) => input.addEventListener("change", update));
reset.hidden = false;
reset.addEventListener("click", () => {
  checks.forEach((input) => {
    input.checked = false;
  });
  update();
});
update();
