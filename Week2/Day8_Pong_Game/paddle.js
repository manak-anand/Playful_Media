class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 100;
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  move(step) {
    this.y += step;
    this.y = constrain(this.y, 0, height - this.h);
  }
}