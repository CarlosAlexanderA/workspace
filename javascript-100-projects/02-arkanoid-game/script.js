// recuperando las etiquetas con query selector
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const $sprite = document.querySelector('#sprite');
const $bricks = document.querySelector('#bricks');

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

// variables de la paleta
const paddleHeight = 10;
const paddleWidth = 50;

let rightPressed = false;
let leftPressed = false;

const PADDLE_SENSITIVITY = 7;

// posision del paddle
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

// VARIABLES DE LOS LADRILLOS (bricks)

const brickRowCount = 6;
const brickColumnCount = 13;
const brickWidth = 30;
const brickHeight = 14;
const brickPadding = 2;
const brickOffsetTop = 80;
const brickOffsetLeft = 16;
const bricks = [];

const BRICK_STATUS = {
  DESTROYED: 0,
  ACTIVE: 1,
};

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = []; // inicializamos con un array vacio

  for (let r = 0; r < brickRowCount; r++) {
    // calculamos la posicion del ladrillo en la pantalla
    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

    // asignamos un color aleatorio a cada ladrillo
    const random = Math.floor(Math.random() * 8);
    // guardamos la informacion de cada ladrillo
    bricks[c][r] = {
      x: brickX,
      y: brickY,
      status: BRICK_STATUS.ACTIVE,
      color: random,
    };
  }
}

//* dibujar la pelota
function drawBall() {
  // comenzar a dibujar
  ctx.beginPath(); // iniciar el trazado
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.closePath(); // para terminar el trazado , mejora rendimiento
}
function drawPaddle() {
  /*
  ctx.fillStyle = 'red';
  //? inicia y cierra el trazado
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
  */

  ctx.drawImage(
    $sprite, // imagen
    89, //clipX: coordenadas de recorte
    174, //clipY: coordenadas de recorte
    paddleWidth, //el tamaño del recorte
    paddleHeight, //tamaño del recorte
    paddleX, // posicion X del dibujo
    paddleY, // posicion Y del dibujo
    paddleWidth, // ancho del dibujo
    paddleHeight // alto del dibujo
  );
}
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const currentBrick = bricks[c][r];
      if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

      ctx.fillStyle = 'yellow';
      ctx.rect(currentBrick.x, currentBrick.y, brickWidth, brickHeight);
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fill();
    }
  }
}

function collisionDetection() {}

// * mover la pelota
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
  // si la pelota toca labarra
  const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth;

  const isBallTouchingPaddle = y + dy > paddleY;
  if (isBallSameXAsPaddle && isBallTouchingPaddle) {
    dy = -dy; // cambiamos la direccionde la pelota
  }
  // en caso de que la pelota toque el suelo
  else if (y + dy > canvas.height - ballRadius) {
    console.log('Game Over');
    document.location.reload();
  }
  x += dx;
  y += dy;
}
//* mover la barra
function paddleMovement() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += PADDLE_SENSITIVITY;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= PADDLE_SENSITIVITY;
  }
}

// * limpiar los items
function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initEvents() {
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);

  function keyDownHandler(event) {
    const {key} = event;
    // ?lo hacemos asi, para ver si el usuario pilsa 2 teclas a la vez
    if (key === 'Right' || key === 'ArrowRight') {
      rightPressed = true;
    } else if (key === 'Left' || key === 'ArrowLeft') {
      leftPressed = true;
    }
  }

  function keyUpHandler(event) {
    const {key} = event;

    // ?lo hacemos asi, para ver si el usuario pilsa 2 teclas a la vez
    if (key === 'Right' || key === 'ArrowRight') {
      rightPressed = false;
    } else if (key === 'Left' || key === 'ArrowLeft') {
      leftPressed = false;
    }
  }
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
initEvents();
