
let fixedColor;

function setup() {
  createCanvas(600, 400);
  fixedColor = color(50, 50, 70);
  background(fixedColor);
  noStroke();
}

function draw() {
}

function mousePressed() {
  let x = width / 2;
  let y = height / 2;
  let ellipseSize = 20;

  fill(255, 165, 0, 150);
  ellipse(mouseX, mouseY, ellipseSize, ellipseSize);
  
  let mirroredX = x - (mouseX - x);
  
  fill(0, 191, 255, 150);
  ellipse(mirroredX, mouseY, ellipseSize, ellipseSize);
}








