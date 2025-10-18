
let leftPaddle, rightPaddle;
let ball;

function setup() {
  createCanvas(1000, 500);
  leftPaddle = new Paddle(30, height / 2 - 50);
  rightPaddle = new Paddle(width - 50, height / 2 - 50);
  ball = new Ball();
}

function draw() {
  background(0);

  // Display and move ball
  ball.update();
  ball.show();

  // Display paddles
  leftPaddle.show();
  rightPaddle.show();

  // Paddle movement
  if (keyIsDown(87)) leftPaddle.move(-8); // W
  if (keyIsDown(83)) leftPaddle.move(8);  // S
  if (keyIsDown(UP_ARROW)) rightPaddle.move(-8);
  if (keyIsDown(DOWN_ARROW)) rightPaddle.move(8);

  // Collisions
  ball.checkPaddle(leftPaddle);
  ball.checkPaddle(rightPaddle);
}


