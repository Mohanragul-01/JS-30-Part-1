const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
const resetButton = document.querySelector("#resetButton");

let lastChecked;

function handleCheck(e) {
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  lastChecked = this;
}

function resetCheckboxes() {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  lastChecked = null;
}

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("click", handleCheck)
);
resetButton.addEventListener("click", resetCheckboxes);
