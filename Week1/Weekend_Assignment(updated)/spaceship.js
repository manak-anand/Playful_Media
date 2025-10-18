class Spaceship {
  constructor() {
    this.x = width / 2;
    this.y = height * 0.75;
    this.size = 60;
  }

  move() {
    if (keyIsDown(65)) this.x -= 6; // A
    if (keyIsDown(68)) this.x += 6; // D
    this.x = constrain(this.x, 30, width - 30);

    if (keyIsDown(87)) scrollSpeed = constrain(scrollSpeed + 0.3, 0, 8); // W
    else scrollSpeed *= 0.95;
  }

  shoot() {
    bullets.push(new Bullet(this.x, this.y - this.size * 0.5));
  }

  show() {
    push();
    translate(this.x, this.y);
    scale(this.size / 50);
    noStroke();

    // Main body
    fill(150, 150, 170);
    ellipse(0, 0, 40, 60);

    // Cockpit
    fill(100, 200, 255, 200);
    ellipse(0, -15, 25, 25);

    // Wings
    fill(100, 100, 120);
    triangle(-25, 10, -5, -10, -5, 30);
    triangle(25, 10, 5, -10, 5, 30);

    // Thrusters
    fill(255, 150, 0);
    rect(-10, 25, 8, 15);
    rect(2, 25, 8, 15);

    // Glow flames
    let glowH = map(abs(scrollSpeed), 0, 8, 10, 35);
    let glowO = map(abs(scrollSpeed), 0, 8, 100, 255);
    fill(255, 200, 50, glowO);
    ellipse(-6, 40 + glowH / 2, 10, glowH);
    ellipse(6, 40 + glowH / 2, 10, glowH);

    pop();
  }
}
