let w = 1500;
let h = 1000;
let cellSize = 100;

function setup() {
  createCanvas(w, h);
  colorMode(RGB, 255); 
  background(20); 
  noStroke(); 
  frameRate(5); 
}

function draw() {
  for (let x = 0; x < w; x += cellSize) {
    for (let y = 0; y < h; y += cellSize) {
      drawShape(x, y, cellSize);
    }
  }
 
}

function drawShape(x, y, size) {
  
  
  let r = random(255);
  let g = random(255);
  let b = random(255);
  fill(r, g, b, 230); 

  let shapeSize = random(0.5, 0.9);
  let randomSize = size * shapeSize;
  
  let shapeType = floor(random(4)); 

  push(); 
  translate(x + size / 2, y + size / 2); 

  if (shapeType === 0) {
    let rectW = random(size * 0.5, size * 0.9);
    let rectH = random(size * 0.5, size * 0.9);
    rectMode(CENTER);
    rect(0, 0, rectW, rectH);
    
  } else if (shapeType === 1) {
    rectMode(CENTER);
    rect(0, 0, randomSize, randomSize);
    
  } else if (shapeType === 2) {
    let halfSize = randomSize / 2;
    triangle(
      0, -halfSize,
      -halfSize, halfSize,
      halfSize, halfSize
    );
    
  } else if (shapeType === 3) {
    let endAngle;
    if (random() < 0.5) {
      endAngle = PI / 2;
    } else {
      endAngle = PI;
    }
    
    let startAngle = floor(random(4)) * PI / 2;
    
    arc(0, 0, randomSize, randomSize, startAngle, startAngle + endAngle, PIE);
  }
  
  pop(); 
}