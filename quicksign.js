const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const myCanvas = document.getElementById("myCanvas"); // ✅ Correct canvas variable name
const clearbutton = document.getElementById("clearbutton");
const savebutton = document.getElementById("savebutton");
const fontPicker = document.getElementById("fontPicker");
const retrievebutton = document.getElementById("retrievebutton");

const ctx = myCanvas.getContext("2d"); // ✅ Fix: use myCanvas not canvas

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// ✅ Color change
colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

// ✅ Start drawing
myCanvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

// ✅ Drawing logic - should be mousemove, not duplicate mousedown
myCanvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

// ✅ Stop drawing
myCanvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

myCanvas.addEventListener("mouseleave", () => {
  isDrawing = false;
});

// ✅ Change canvas background color
canvasColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height); // ✅ Fix: fillRect not fillReact
});

// ✅ Change stroke width
fontPicker.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value; // ✅ Fix: lineWidth not linwidth
});

// ✅ Clear canvas
clearbutton.addEventListener("click", () => {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); // ✅ Fix: clearRect not clearReact
});

// ✅ Save canvas to image and localStorage
savebutton.addEventListener("click", () => {
  const dataURL = myCanvas.toDataURL();
  localStorage.setItem("canvasContents", dataURL);

  const link = document.createElement("a");
  link.download = "my-canvas.png"; // ✅ Fix: typo in 'canvas'
  link.href = dataURL;
  link.click();
});

// ✅ Retrieve canvas from localStorage
retrievebutton.addEventListener("click", () => {
  const savedCanvas = localStorage.getItem("canvasContents");

  if (savedCanvas) {
    const img = new Image();
    img.src = savedCanvas;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }
});
