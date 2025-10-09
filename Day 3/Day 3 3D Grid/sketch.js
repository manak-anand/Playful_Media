let w = 1500;
let h = 1000;
let cellSize = 50;

function setup() {
  createCanvas(w, h, WEBGL);
  colorMode(RGB, 255); 
  
  ambientLight(150); 
  pointLight(255, 255, 255, 0, 0, 500); 
  frameRate(30);
  noStroke();
}

function draw() {
  background(20); 
  
 
  rotateY(frameCount * 0.005); 
  rotateX(frameCount * 0.002);

  for (let x = 0; x < w; x += cellSize) {
    for (let y = 0; y < h; y += cellSize) {
      let offsetX = x - w / 2 + cellSize / 2;
      let offsetY = y - h / 2 + cellSize / 2;
      draw3DShape(offsetX, offsetY, cellSize);
    }
  }
}

function draw3DShape(x, y, size) {
  
  let r = random(255);
  let g = random(255);
  let b = random(255);
  fill(r, g, b, 230); 

  let shapeSize = random(0.5, 0.9);
  let randomSize = size * shapeSize;
  
  let shapeType = floor(random(4)); 

  push(); 
  translate(x, y, 0); 



  if (shapeType === 0) {
    box(randomSize);
    
  } else if (shapeType === 1) {
    sphere(randomSize / 2);
    
  } else if (shapeType === 2) {
    cone(randomSize / 2, randomSize); 
    
  } else if (shapeType === 3) {
    cylinder(randomSize / 2, randomSize); 
  }
  
  pop(); 
}