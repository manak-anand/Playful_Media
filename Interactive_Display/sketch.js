let stars = []; 
let spaceshipX; 
let spaceshipY; 
let spaceshipSize = 60; 
let scrollSpeedY = 0; 
const MAX_SCROLL_SPEED = 8;
const SHIP_SPEED = 8;

let bullets = []; 
const BULLET_SPEED = 15;
const BULLET_SIZE = 5;

// --- Game State & Timing ---
let gameState = 0; 
let lastClusterTime = 0;
const CLUSTER_SPAWN_INTERVAL = 3000; // 3 seconds

// --- Colors & Emotional State ---
let GRADIENT_TOP_R = 10;
let GRADIENT_TOP_G = 20;
let GRADIENT_TOP_B = 100;

let GRADIENT_TOP_COLOR; 
let GRADIENT_BOTTOM_COLOR;

let ambientHueShift = 0; 
const HUE_SHIFT_MAX = 180; 
const HUE_SHIFT_RATE_POSITIVE = 60; 
const HUE_SHIFT_RATE_NEGATIVE = -120; // Aggressive negative pull
const HUE_DECAY_RATE = 0.005; 

// --- Emotional Cluster Definitions ---
let emotionalClusters = [];
let explosionParticles = []; 
let transformedClusters = []; 
let feedbackTexts = []; 
let thoughtCurrents = []; 
let asteroidFigures = []; 

const CLUSTER_TYPES = [
  // Negative Emotions (Targets)
  { name: "Anxiety",    color: "#D32F2F", shape: "square",   category: "Negative" },   
  { name: "Doubt",      color: "#757575", shape: "pentagon", category: "Negative" },  
  { name: "Apathy",     color: "#1A237E", shape: "circle",   category: "Negative" },    
  { name: "Grief",      color: "#0D47A1", shape: "triangle", category: "Negative" },  

  // Positive Emotions (Passive elements)
  { name: "Joy",        color: "#FFEB3B", shape: "star",     category: "Positive" },    
  { name: "Clarity",    color: "#00BCD4", shape: "circle",   category: "Positive" }, 
  { name: "Compassion", color: "#C51162", shape: "cross",    category: "Positive" }, 
  { name: "Hope",       color: "#4CAF50", shape: "triangle", category: "Positive" }      
];
const MAX_CLUSTERS = 15; 
const CLUSTER_MIN_SIZE = 90; 
const CLUSTER_MAX_SIZE = 150;

// --- Thought Current Variables ---
const MAX_THOUGHT_CURRENTS = 3;
const THOUGHT_CURRENT_SPAWN_INTERVAL = 10000; // 10 seconds
let lastThoughtCurrentTime = 0;

// --- Asteroid Figures Variables ---
const MAX_ASTEROID_FIGURES = 8;
const ASTEROID_MIN_SIZE = 40;
const ASTEROID_MAX_SIZE = 120;
const ASTEROID_SPEED_FACTOR = 0.1;

// --- Setup Function ---
function setup() {
  createCanvas(windowWidth, windowHeight); 
  document.oncontextmenu = () => false; 
  
  // Initialize P5.js color objects
  GRADIENT_TOP_COLOR = color(GRADIENT_TOP_R, GRADIENT_TOP_G, GRADIENT_TOP_B);
  GRADIENT_BOTTOM_COLOR = color(0, 0, 0);

  spaceshipX = width / 2;
  spaceshipY = height * 0.75; 

  // Create stars once
  for (let i = 0; i < 350; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      twinklePhase: random(100) 
    });
  }

  // Initialize Asteroid Figures
  for (let i = 0; i < MAX_ASTEROID_FIGURES; i++) {
    asteroidFigures.push(createAsteroidFigure());
  }
}

// --- Draw Function ---
function draw() {
  if (gameState === 0) {
    drawStartScreen();
  } else {
    handleInput();
    
    // Smoothly ease the hue shift back to neutral (dark)
    ambientHueShift = lerp(ambientHueShift, 0, HUE_DECAY_RATE);
    
    drawBackgroundGradient();
    
    // Draw Asteroid Figures (Deep Background Layer)
    moveAsteroidFigures();
    drawAsteroidFigures();
    
    drawStars(); 
    
    // --- Thought Current Logic ---
    addThoughtCurrents();
    moveThoughtCurrents();
    drawThoughtCurrents();

    drawSpaceship(spaceshipX, spaceshipY, spaceshipSize); 
    
    // --- Game Play Logic ---
    addEmotionalClusters();
    moveEmotionalClusters();
    drawEmotionalClusters();
    
    updateExplosionParticles();
    drawExplosionParticles();
    
    updateFeedbackTexts();
    drawFeedbackTexts();

    updateTransformedClusters();
    drawTransformedClusters();
    
    moveBullets();
    drawBullets();
  }
}

// ------------------------------------
// Start Screen Logic
// ------------------------------------

function drawStartScreen() {
  drawBackgroundGradient();
  drawStars();
  
  push();
  drawSpaceship(spaceshipX, spaceshipY, spaceshipSize);
  
  fill(255);
  textAlign(CENTER, CENTER);
  
  // 1. Main Prompt
  textSize(30);
  text("Press ANY KEY to Start", width / 2, height * 0.3);

  // 2. Narrative Explanation Text
  textSize(18);
  let lineHeight = 26;
  let startY = height * 0.55; 

  const narrativeText = [
    "🚀: Your Consciousness",
    "Outer Space: Your Headspace",
    "Sphere: Emotions",
    "", // Blank line for spacing
    "W-A-S-D: Moving Through Your Mind",
    "Left-Mouse Click: Focussed Thought (Structuring)",
    "Right-Mouse Click: Scattered Thoughts (Pattern Imbuing)",
    "Background Ambience: Your State"
  ];

  // Draw the narrative lines
  for (let i = 0; i < narrativeText.length; i++) {
    text(narrativeText[i], width / 2, startY + i * lineHeight);
  }
  
  pop();
}

function keyPressed() {
  if (gameState === 0) {
    gameState = 1; 
    lastClusterTime = millis(); 
    lastThoughtCurrentTime = millis();
  }
}

// ------------------------------------
// Emotional Cluster Functions
// ------------------------------------

function addEmotionalClusters() {
    let currentTime = millis();
    if (emotionalClusters.length < MAX_CLUSTERS && (currentTime - lastClusterTime > CLUSTER_SPAWN_INTERVAL)) { 
        let type = random(CLUSTER_TYPES);
        emotionalClusters.push({
            x: random(width),
            y: random(-height / 2, 0), 
            size: random(CLUSTER_MIN_SIZE, CLUSTER_MAX_SIZE),
            color: type.color,
            emotion: type.name,       
            shapeType: type.shape, 
            category: type.category, 
            transformed: false 
        });
        lastClusterTime = currentTime; 
    }
}

function moveEmotionalClusters() {
  for (let i = emotionalClusters.length - 1; i >= 0; i--) {
    let cluster = emotionalClusters[i];
    cluster.y += scrollSpeedY * 0.5;

    if (cluster.y > height + cluster.size) {
      emotionalClusters.splice(i, 1);
    }
  }
}

function drawEmotionalClusters() {
  for (let cluster of emotionalClusters) {
    push();
    translate(cluster.x, cluster.y);
    
    if (!cluster.transformed) {
      drawGlowSphere(cluster.size, cluster.color);
    } 
    pop();
  }
}

function drawGlowSphere(size, colorCode) {
    let baseColor = color(colorCode);
    noStroke();
    
    // Outer Glow Layer
    for (let i = 0; i < 4; i++) {
        let alpha = map(i, 0, 4, 10, 50); 
        let glowSize = size * (1.0 + i * 0.1);
        fill(red(baseColor), green(baseColor), blue(baseColor), alpha);
        ellipse(0, 0, glowSize);
    }
    
    // Core Sphere
    fill(baseColor);
    ellipse(0, 0, size);
    
    // Small Highlight
    fill(255, 255, 255, 100);
    ellipse(-size * 0.25, -size * 0.25, size * 0.2);
}

// ------------------------------------
// Collision and Destruction Logic
// ------------------------------------

function createExplosion(x, y, colorCode, count) {
    let baseColor = color(colorCode);
    for (let i = 0; i < count; i++) {
        explosionParticles.push({
            x: x,
            y: y,
            vx: random(-5, 5),
            vy: random(-5, 5),
            life: 60, 
            color: baseColor
        });
    }
}

function updateExplosionParticles() {
    for (let i = explosionParticles.length - 1; i >= 0; i--) {
        let p = explosionParticles[i];
        p.x += p.vx + scrollSpeedY * 0.5; 
        p.y += p.vy + scrollSpeedY * 0.5;
        p.life -= 1;
        if (p.life <= 0) {
            explosionParticles.splice(i, 1);
        }
    }
}

function drawExplosionParticles() {
    for (let p of explosionParticles) {
        let alpha = map(p.life, 0, 60, 0, 255);
        fill(red(p.color), green(p.color), blue(p.color), alpha);
        ellipse(p.x, p.y, 4);
    }
}

function updateTransformedClusters() {
    for (let i = transformedClusters.length - 1; i >= 0; i--) {
        let cluster = transformedClusters[i];
        cluster.y += scrollSpeedY * 0.5;
        cluster.life -= 1;
        if (cluster.life <= 0) {
            transformedClusters.splice(i, 1);
        }
    }
}

function drawTransformedClusters() {
    noStroke(); 
    for (let cluster of transformedClusters) {
        let alpha = map(cluster.life, 0, 60, 0, 255);
        let baseColor = color(cluster.color);
        fill(red(baseColor), green(baseColor), blue(baseColor), alpha);
        
        push();
        translate(cluster.x, cluster.y);
        rotate(frameCount * 0.05);

        let size = cluster.size; 

        if (cluster.type === 'pattern') {
            drawStar(0, 0, size * 0.4, size * 0.9, 5); 
        } else { // 'structured'
            if (cluster.shapeType === "circle") ellipse(0, 0, size);
            else if (cluster.shapeType === "triangle") triangle(0, -size / 2, -size / 2, size / 2, size / 2, size / 2);
            else if (cluster.shapeType === "square") rect(-size / 2, -size / 2, size, size); 
            else if (cluster.shapeType === "pentagon") drawPolygon(0, 0, size / 2, 5);
            else if (cluster.shapeType === "cross") drawCross(0, 0, size, size); 
            else if (cluster.shapeType === "star") drawStar(0, 0, size * 0.4, size * 0.9, 5); 
            else ellipse(0, 0, size); 
        }
        pop();
    }
}

function createFeedbackText(x, y, emotionName, colorCode) {
    feedbackTexts.push({
        x: x,
        y: y,
        text: emotionName,
        color: color(colorCode),
        life: 120, 
        vy: -1 
    });
}

function updateFeedbackTexts() {
    for (let i = feedbackTexts.length - 1; i >= 0; i--) {
        let text = feedbackTexts[i];
        text.y += text.vy + scrollSpeedY * 0.5; 
        text.life -= 1;
        if (text.life <= 0) {
            feedbackTexts.splice(i, 1);
        }
    }
}

function drawFeedbackTexts() {
    push();
    textAlign(CENTER, CENTER);
    for (let textObj of feedbackTexts) {
        let alpha = map(textObj.life, 0, 120, 0, 255);
        fill(red(textObj.color), green(textObj.color), blue(textObj.color), alpha);
        textSize(24);
        text(textObj.text, textObj.x, textObj.y);
    }
    pop();
}


// ------------------------------------
// Emotional Background Feedback
// ------------------------------------

function handleHitFeedback(category) {
    if (category === "Positive") {
        ambientHueShift = constrain(ambientHueShift + HUE_SHIFT_RATE_POSITIVE, 0, HUE_SHIFT_MAX);
    } else { // Negative
        // ⭐ FINAL FIX: Apply the negative rate. This will pull the color down to guaranteed darkness.
        ambientHueShift = constrain(ambientHueShift + HUE_SHIFT_RATE_NEGATIVE, -100, HUE_SHIFT_MAX); 
    }
}

// ------------------------------------
// Core Game Play & Bullet Logic
// ------------------------------------

function handleInput() {
  if (keyIsDown(65)) { spaceshipX -= SHIP_SPEED; }
  if (keyIsDown(68)) { spaceshipX += SHIP_SPEED; }
  spaceshipX = constrain(spaceshipX, spaceshipSize / 2, width - spaceshipSize / 2);

  if (keyIsDown(87)) { scrollSpeedY = constrain(scrollSpeedY + 0.4, 0, MAX_SCROLL_SPEED); } 
  else if (keyIsDown(83)) { scrollSpeedY = constrain(scrollSpeedY - 0.4, -MAX_SCROLL_SPEED, 0); } 
  else { scrollSpeedY *= 0.95; }
  
  for (let star of stars) {
    star.y += scrollSpeedY * (star.size * 0.8); 
    if (star.y > height) { star.y = 0; star.x = random(width); }
    else if (star.y < 0) { star.y = height; star.x = random(width); }
  }
}

function mousePressed() {
  if (gameState !== 1) return;

  let bulletYOffset = spaceshipSize * 0.5;
  
  if (mouseButton === LEFT) {
    bullets.push({ x: spaceshipX, y: spaceshipY - bulletYOffset, speedX: 0, speedY: BULLET_SPEED, color: color(255, 50, 50), type: 'structured' });
  } else if (mouseButton === RIGHT) {
    let divergenceAngle = 0.5; 
    
    bullets.push({ x: spaceshipX - 10, y: spaceshipY - bulletYOffset, speedX: -BULLET_SPEED * sin(divergenceAngle), speedY: BULLET_SPEED * cos(divergenceAngle), color: color(50, 255, 255), type: 'pattern' });
    bullets.push({ x: spaceshipX, y: spaceshipY - bulletYOffset, speedX: 0, speedY: BULLET_SPEED, color: color(50, 255, 50), type: 'pattern' });
    bullets.push({ x: spaceshipX + 10, y: spaceshipY - bulletYOffset, speedX: BULLET_SPEED * sin(divergenceAngle), speedY: BULLET_SPEED * cos(divergenceAngle), color: color(255, 255, 50), type: 'pattern' });
  }
}

function moveBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i];
    bullet.y -= bullet.speedY; 
    bullet.x += bullet.speedX; 
    
    for (let j = emotionalClusters.length - 1; j >= 0; j--) {
      let cluster = emotionalClusters[j];
      
      const COLLISION_RADIUS = cluster.size * 0.75; 
      let d = dist(bullet.x, bullet.y, cluster.x, cluster.y);
      
      if (d < COLLISION_RADIUS + BULLET_SIZE / 2 && !cluster.transformed) { 
        
        handleHitFeedback(cluster.category);

        createExplosion(cluster.x, cluster.y, cluster.color, 15); 
        createFeedbackText(cluster.x, cluster.y, cluster.emotion, cluster.color);

        let transformedType = (bullet.type === 'pattern') ? 'pattern' : 'structured';
        transformedClusters.push({
            x: cluster.x, y: cluster.y, size: cluster.size, color: cluster.color, 
            life: 60, type: transformedType, shapeType: cluster.shapeType
        });
        
        emotionalClusters.splice(j, 1);
        
        bullets.splice(i, 1);
        return; 
      }
    }
    
    if (bullet) { 
      if (bullet.y < 0 || bullet.x < -BULLET_SIZE || bullet.x > width + BULLET_SIZE) {
        bullets.splice(i, 1); 
      }
    }
  }
}

function drawBullets() {
  noStroke();
  for (let bullet of bullets) {
    fill(bullet.color); 
    rect(bullet.x - BULLET_SIZE / 2, bullet.y, BULLET_SIZE, BULLET_SIZE * 3);
  }
}

// ------------------------------------
// Utility Functions
// ------------------------------------

function drawBackgroundGradient() {
  push();
  if (gameState === 1) { translate(0, scrollSpeedY * 5); }
  
  // Apply ambientHueShift to both gradient colors
  let topR = constrain(red(GRADIENT_TOP_COLOR) + ambientHueShift, 0, 255);
  let topG = constrain(green(GRADIENT_TOP_COLOR) + ambientHueShift * 0.5, 0, 255);
  let topB = constrain(blue(GRADIENT_TOP_COLOR) + ambientHueShift, 0, 255); 

  for (let y = -height; y < height * 2; y++) { 
    let inter = map(y, 0, height, 0, 1);
    
    let r = lerp(topR, red(GRADIENT_BOTTOM_COLOR), inter);
    let g = lerp(topG, green(GRADIENT_BOTTOM_COLOR), inter);
    let b = lerp(topB, blue(GRADIENT_BOTTOM_COLOR), inter);
    
    stroke(r, g, b); 
    line(0, y, width, y); 
  }
  pop();
}

function drawStars() {
  noStroke();
  for (let star of stars) {
    let brightness = map(sin(frameCount * 0.05 + star.twinklePhase), -1, 1, 150, 255);
    fill(brightness);
    ellipse(star.x, star.y, star.size);
  }
}

function drawSpaceship(x, y, size) {
  push(); 
  translate(x, y); 
  scale(size / 50); 
  noStroke();

  fill(150, 150, 170); 
  ellipse(0, 0, 40, 60); 
  fill(100, 200, 255, 200); 
  ellipse(0, -15, 25, 25); 
  fill(100, 100, 120); 
  triangle(-25, 10, -5, -10, -5, 30); 
  triangle(25, 10, 5, -10, 5, 30);   
  let glowHeight = gameState === 1 ? map(abs(scrollSpeedY), 0, MAX_SCROLL_SPEED, 10, 35) : 10;
  let glowOpacity = gameState === 1 ? map(abs(scrollSpeedY), 0, MAX_SCROLL_SPEED, 100, 255) : 200; 
  fill(255, 150, 0); 
  rect(-10, 25, 8, 15); 
  rect(2, 25, 8, 15);   
  fill(255, 200, 50, glowOpacity); 
  ellipse(-6, 40 + glowHeight/2, 10, glowHeight); 
  ellipse(6, 40 + glowHeight/2, 10, glowHeight);   
  pop(); 
}

function drawPolygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawCross(x, y, width, height) {
  rect(x - width/2, y - height/6, width, height/3); 
  rect(x - height/6, y - width/2, height/3, width); 
}

// --- Thought Current Logic (Standard) ---
function addThoughtCurrents() {
  let currentTime = millis();
  if (thoughtCurrents.length < MAX_THOUGHT_CURRENTS && (currentTime - lastThoughtCurrentTime > THOUGHT_CURRENT_SPAWN_INTERVAL)) {
    let startX, startY;
    if (random() > 0.5) { 
      startX = random() > 0.5 ? -width / 2 : width * 1.5; 
      startY = random(height);
    } else { 
      startX = random(width);
      startY = -height / 2;
    }

    thoughtCurrents.push({
      x: startX,
      y: startY,
      size: random(width * 0.8, width * 1.5), 
      color: color(100, 50, 150, 10), 
      speedX: random(-0.2, 0.2), 
      speedY: random(0.1, 0.3), 
      seed: random(1000) 
    });
    lastThoughtCurrentTime = currentTime;
  }
}

function moveThoughtCurrents() {
  for (let i = thoughtCurrents.length - 1; i >= 0; i--) {
    let current = thoughtCurrents[i];
    current.x += current.speedX + map(noise(current.seed + frameCount * 0.001), 0, 1, -0.5, 0.5);
    current.y += current.speedY + map(noise(current.seed + 1000 + frameCount * 0.001), 0, 1, -0.5, 0.5);

    if (current.y > height * 1.5 || current.x < -width || current.x > width * 2) {
      thoughtCurrents.splice(i, 1);
    }
  }
}

function drawThoughtCurrents() {
  noStroke();
  for (let current of thoughtCurrents) {
    fill(current.color);

    push();
    translate(current.x, current.y);
    beginShape();
    let detail = 20; 
    let blobRadius = current.size / 2;
    for (let i = 0; i < detail; i++) {
      let angle = map(i, 0, detail, 0, TWO_PI);
      let r = blobRadius + map(noise(current.seed + i * 0.1 + frameCount * 0.005), 0, 1, -blobRadius * 0.1, blobRadius * 0.1);
      curveVertex(cos(angle) * r, sin(angle) * r);
    }
    endShape(CLOSE);
    pop();
  }
}

// ------------------------------------
// Asteroid Figure Functions
// ------------------------------------

function createAsteroidFigure() {
  let size = random(ASTEROID_MIN_SIZE, ASTEROID_MAX_SIZE);
  let x = random(width);
  let y = random(-height, height * 2); 
  let rotationSpeed = random(-0.005, 0.005);
  
  let colorValue = random(30, 80); 
  let colorAlpha = random(30, 80); 
  
  let vertices = [];
  let numSides = floor(random(6, 12));
  let noiseSeed = random(1000);
  
  for(let i = 0; i < numSides; i++) {
    let angle = map(i, 0, numSides, 0, TWO_PI);
    let r = size / 2 + size * 0.1 * noise(i * 0.5, noiseSeed); 
    vertices.push({x: cos(angle) * r, y: sin(angle) * r});
  }

  return {
    x: x,
    y: y,
    size: size,
    color: color(colorValue, colorValue, colorValue + 20, colorAlpha),
    rotation: random(TWO_PI),
    rotationSpeed: rotationSpeed,
    vertices: vertices,
    speedFactor: random(0.1, 0.4) 
  };
}

function moveAsteroidFigures() {
  for (let i = asteroidFigures.length - 1; i >= 0; i--) {
    let asteroid = asteroidFigures[i];
    
    asteroid.y += scrollSpeedY * asteroid.speedFactor;
    asteroid.rotation += asteroid.rotationSpeed;

    if (asteroid.y > height + asteroid.size) {
      asteroidFigures[i] = createAsteroidFigure();
      asteroidFigures[i].y = -asteroidFigures[i].size; 
      asteroidFigures[i].x = random(width);
    } else if (asteroid.y < -asteroid.size) {
      asteroidFigures[i] = createAsteroidFigure();
      asteroidFigures[i].y = height + asteroidFigures[i].size; 
      asteroidFigures[i].x = random(width);
    }
  }
}

function drawAsteroidFigures() {
  for (let asteroid of asteroidFigures) {
    fill(asteroid.color);
    push();
    translate(asteroid.x, asteroid.y);
    rotate(asteroid.rotation);
    
    beginShape();
    for (let v of asteroid.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    pop();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  spaceshipX = width / 2;
  spaceshipY = height * 0.75; 

  stars = [];
  for (let i = 0; i < 350; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      twinklePhase: random(100)
    });
  }
  emotionalClusters = []; 
  explosionParticles = [];
  transformedClusters = [];
  feedbackTexts = [];
  thoughtCurrents = [];
  asteroidFigures = []; 
  for (let i = 0; i < MAX_ASTEROID_FIGURES; i++) {
    asteroidFigures.push(createAsteroidFigure());
  }
}