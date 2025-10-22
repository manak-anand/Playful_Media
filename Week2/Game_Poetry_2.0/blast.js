
class Fragment {
  constructor(x, y, col) {
    this.x = x
    this.y = y
    this.vx = random(-2, 2)
    this.vy = random(-2, 2)
    this.life = 255
    this.color = col
    this.size = random(4, 10)
  }
  update() { this.x += this.vx; this.y += this.vy; this.life -= 5 }
  show() { fill(red(this.color), green(this.color), blue(this.color), this.life); noStroke(); ellipse(this.x, this.y, this.size) }
}
