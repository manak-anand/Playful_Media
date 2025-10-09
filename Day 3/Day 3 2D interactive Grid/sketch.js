let w = 1500;
let h = 1000;
let cellSize = 50;
let shapeData = []; 

function setup() {
  createCanvas(w, h);
  colorMode(RGB, 255); 
  background(20); 
  noStroke(); 
  frameRate(30);

  initializeShapeData();
}

function initializeShapeData() {
  shapeData = [];
  
  for (let x = 0; x < w; x += cellSize) {
    for (let y = 0; y < h; y += cellSize) {
      // Current position is the initial (home) position
      let currentX = x + cellSize / 2;
      let currentY = y + cellSize / 2;
      
      shapeData.push({
        // Fixed properties
        r: random(255),
        g: random(255),
        b: random(255),
        shapeType: floor(random(4)), // Fixed shape type
        
        // Position and Velocity
        currentX: currentX,
        currentY: currentY,
        velX: 0,
        velY: 0,
        
        // Original grid position
        homeX: currentX,
        homeY: currentY
      });
    }
  }
}

function draw() {
  background(20); 

  for (let i = 0; i < shapeData.length; i++) {
    let data = shapeData[i];
    
    // 1. Update Position
    data.currentX += data.velX;
    data.currentY += data.velY;
    
    // 2. Apply Damping (Friction)
    data.velX *= 0.95; 
    data.velY *= 0.95;
    
    // 3. Apply Spring Force (Pull back to home)
    let springStrength = 0.05; 
    data.velX += (data.homeX - data.currentX) * springStrength;
    data.velY += (data.homeY - data.currentY) * springStrength;
    
    drawRandomShape(data);
  }
}

function drawRandomShape(data) {
  
  fill(data.r, data.g, data.b, 230); 

  let shapeSizeFactor = random(0.5, 0.9);
  let randomSize = cellSize * shapeSizeFactor;
  
  push(); 
  // Translate to the current, frame-updated position
  translate(data.currentX, data.currentY); 

  if (data.shapeType === 0) {
    let rectW = random(cellSize * 0.5, cellSize * 0.9);
    let rectH = random(cellSize * 0.5, cellSize * 0.9);
    rectMode(CENTER);
    rect(0, 0, rectW, rectH);
    
  } else if (data.shapeType === 1) {
    rectMode(CENTER);
    rect(0, 0, randomSize, randomSize);
    
  } else if (data.shapeType === 2) {
    let halfSize = randomSize / 2;
    triangle(
      0, -halfSize,
      -halfSize, halfSize,
      halfSize, halfSize
    );
    
  } else if (data.shapeType === 3) {
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

function mouseDragged() {
  // Mouse position does not need WEBGL adjustment
  let mouseXRel = mouseX;
  let mouseYRel = mouseY;
  
  // Define the radius and force for scattering
  let scatterRadius = cellSize * 2.5; 
  let scatterForce = 15; // Slightly less force than 3D as there's no Z-axis escape

  for (let i = 0; i < shapeData.length; i++) {
    let data = shapeData[i];
    
    // Check distance from the mouse drag location to the shape's current position
    let d = dist(mouseXRel, mouseYRel, data.currentX, data.currentY);

    if (d < scatterRadius) {
      // Calculate a vector pointing away from the mouse cursor
      let dx = data.currentX - mouseXRel;
      let dy = data.currentY - mouseYRel;

      let scatterVector = createVector(dx, dy);
      
      // Map the force based on proximity to the cursor
      let forceMultiplier = map(d, 0, scatterRadius, 1, 0.2); 
      scatterVector.normalize();
      
      // Apply the force to the shape's velocity
      data.velX += scatterVector.x * scatterForce * forceMultiplier;
      data.velY += scatterVector.y * scatterForce * forceMultiplier;
    }
  }
}