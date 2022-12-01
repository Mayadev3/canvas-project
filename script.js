const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const clearBtn = document.getElementById("clear");
const colorEl = document.getElementById("color");
const sizeEl = document.getElementById("size");

// those variables are global because they will keep changing and will be used in different ways in different functions
let size = 10;
let isPressed = false;
let color = "black";
let x;
let y;

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
  console.log(isPressed, x, y);

  //this function shows the coordinates of where the mouse is pressed inside the canvas
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
  console.log(isPressed, x, y);
  //this function doesnt want to take in the location of the mouse when it isnt pressed anymore
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    console.log(x2, y2);
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
    //the variables are equal so that what is drawn is nsync with where i am pressing, otherwise it keeps drawing lines from the first point to the second point
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1); // when you move your hand off the paper and to the point you want to start with
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2; //multiplied by 2 because when drawing the line was too small cause it is equal to the radius so i doubled the size
  ctx.stroke();
}

colorEl.addEventListener("change", (e) => (color = e.target.value));

increaseBtn.addEventListener("click", (e) => {
  size += 5; // it keeps adding 5

  if (size > 50) {
    size = 50; // so it doesnt go above 50
  }
  sizeEl.innerHTML = size;
});

decreaseBtn.addEventListener("click", (e) => {
  size -= 5; // it keeps subtracting 5

  if (size < 5) {
    size = 5; //so it doesnt go below 5
  }
  sizeEl.innerHTML = size;
});

clearBtn.addEventListener("click", () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);
