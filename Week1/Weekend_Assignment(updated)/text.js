class FloatingText {
  constructor(x, y, txt, col) {
    this.x = x;
    this.y = y;
    this.text = txt;
    this.color = col;
    this.life = 100;
  }

  update() {
    this.y -= 1;
    this.life -= 2;
  }

  show() {
    push();
    fill(red(this.color), green(this.color), blue(this.color), this.life * 2.5);
    noStroke();
    textAlign(CENTER);
    textSize(24);
    text(this.text, this.x, this.y);
    pop();
  }
}