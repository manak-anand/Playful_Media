let n = 20;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(220);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  translate(width / 2, height / 2);

  push();
  function drawFlower() {
    for (let i = 0; i < n; i++) {
      rotate(360 / n);
      fill(220, 10, 10, 100);
      ellipse(0 + 100, 0, 100, 40);
    }
    fill("yellow");
    ellipse(0, 0, 120);
  }
drawFlower();

  pop();







}
