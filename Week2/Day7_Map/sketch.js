let x;
function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  x = map(mouseX,0,innerWidth,0,255);
  background(x);
  
}
