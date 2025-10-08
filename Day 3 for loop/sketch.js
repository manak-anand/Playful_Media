let x, y;
x = 30;
y = 30;
function setup() {
  createCanvas(innerWidth,innerHeight);
  background(220);
  frameRate(10);
  
}

function draw() {

  for (x = 30; x < width; x = x + 40) {
  
    for (y = 30; y < height; y = y + 40) {

      fill(random(0,255), random(0,155), random(0,155));
      ellipse(x, y, 30, 30)

    }

  }
}