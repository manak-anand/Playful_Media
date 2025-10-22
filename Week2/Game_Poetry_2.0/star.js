class Star {
  constructor() { this.x = random(width); this.y = random(height); this.size = random(1, 3) }
  move() { this.y += scrollSpeed * this.size * 0.5; if (this.y > height) this.y = 0 }
  show() { noStroke(); fill(255); ellipse(this.x, this.y, this.size) }
}