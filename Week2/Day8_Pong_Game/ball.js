class Ball {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 15;
    this.xSpeed = random([-5, 5]);
    this.ySpeed = random(-3, 3);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Bounce off top and bottom
    if (this.y < this.r || this.y > height - this.r) {
      this.ySpeed *= -1;
    }

    // Reset if ball goes out
    if (this.x < 0 || this.x > width) {
      this.reset();
    }
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }

  checkPaddle(paddle) {
    if (
      this.x - this.r < paddle.x + paddle.w &&
      this.x + this.r > paddle.x &&
      this.y > paddle.y &&
      this.y < paddle.y + paddle.h
    ) {
      this.xSpeed *= -1;
    }
  }
}