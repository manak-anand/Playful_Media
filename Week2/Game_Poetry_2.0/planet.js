class Planet {
  constructor() {
    let type = random(emotionTypes)
    this.x = random(width)
    this.y = random(-200, 0)
    this.size = random(60, 120)
    this.color = color(type.color)
    this.name = type.name
    this.category = type.type
    this.destroyed = false
  }
  move() { this.y += scrollSpeed * 0.5 }
  show() { if (!this.destroyed) { noStroke(); fill(this.color); ellipse(this.x, this.y, this.size) } }
  hit(bullet) { return dist(this.x, this.y, bullet.x, bullet.y) < this.size / 2 }
}