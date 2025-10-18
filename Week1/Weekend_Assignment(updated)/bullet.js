class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 8;
  }

  move() {
    this.y -= this.speed;
  }

  show() {
    fill(255, 100, 100);
    rect(this.x - 2, this.y, 4, 10);
  }
}
