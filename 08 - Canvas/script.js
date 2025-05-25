const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 50;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
let useColorCycle = true;
let fixedColor = "#a020f0";

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = useColorCycle ? `hsl(${hue}, 100%, 50%)` : fixedColor;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  if (useColorCycle) {
    hue++;
    if (hue >= 360) hue = 0;
  }
}

// Clear canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Update line width
function updateLineWidth() {
  ctx.lineWidth = this.value;
  direction = this.value >= 100 ? false : this.value <= 1 ? true : direction;
}

// Toggle color mode
function toggleColorMode() {
  useColorCycle = this.checked;
}

// Update fixed color
function updateColor() {
  fixedColor = this.value;
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

document.querySelector("#clearCanvas").addEventListener("click", clearCanvas);
document.querySelector("#lineWidth").addEventListener("input", updateLineWidth);
document
  .querySelector("#colorMode")
  .addEventListener("change", toggleColorMode);
document.querySelector("#colorPicker").addEventListener("input", updateColor);

// Adjust canvas size on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.7;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = document.querySelector("#lineWidth").value;
});
