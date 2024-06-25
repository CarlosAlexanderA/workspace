// recuperando las etiquetas con query selector
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// diemnsiones de nuestro cuadro
canvas.width = 448;
canvas.height = 400;

//* variables de la pelota
const ballRadius = 3;

// posision de la pelota
let x = canvas.width / 2;
let y = canvas.height - 30;

// velocidad de la pelota
let dx = 2;
let dy = -2;

function drawBall() {
  // comenzar a dibujar
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.closePath(); // para terminar el trazado , mejora rendimiento
}
function drawPaddle() {}
function drawBricks() {}

function collisionDetection() {}
function ballMovement() {
  // rebotar la pelota en los laterales
  if (
    x + dx > canvas.width - ballRadius || // la pared derecha
    x + dx < ballRadius // la pared derecha
  ) {
    dx = -dx;
  }
  // rebotar en la parte superior
  if (y + dy < ballRadius) {
    dy = -dy;
  }
  // en caso de que caiga
  if (y + dy > canvas.height - ballRadius) {
    console.log('Game Over');
    document.location.reload();
  }
  x += dx;
  y += dy;
}
function paddleMovement() {}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// funcion para dibujar dentro del cuadro
function draw() {
  // limpiamos la pantalla por cada vez que se dibuja
  cleanCanvas();

  // dibujar los elementos
  drawBall();
  drawPaddle();
  drawBricks();

  //colisiones y movimientos
  collisionDetection();
  ballMovement();
  paddleMovement();

  // recursividad
  window.requestAnimationFrame(draw);
  //* requestAnimationFrame-> crea una funcion que se ejecuta justo antes de cada repintado por el refresco de la pantalla
}

draw();
