let spritesheet;
let backgroundImg;
let spriteWidth = 65;   
let spriteHeight = 65;
let animations = {
  idle: { row: 0, frames: 4 },
  run: { row: 1, frames: 4 },
  attack: { row: 2, frames: 4 }, 
  defend: { row: 3, frames: 4 }  
};

let currentAnimation = 'idle';
let currentFrame = 0;
let frameRateFactor = 8;

let x = 500;
let y = 500;
let speed = 5;
let spriteScale = 2;
let flipped = false;

let frameCounter = 0;
let attackTriggered = false; // Flag for the one-shot attack animation
let defending = false;      // Flag for the continuous defense animation (Shift key)

function preload() {
  spritesheet = loadImage('spritesheet.png');
  backgroundImg = loadImage('2.jpg');
}

function setup() {
  createCanvas(1000, 1000);
  imageMode(CENTER);
  frameRate(60);
}

function draw() {
  push();
  imageMode(CORNER);
  image(backgroundImg, 0, 0, width, height); 
  pop();

  
  
  let intendedAnimation = 'idle';
  let moving = false;
  
  // 1. Check for *Defense (Shift Key)* 
  if (keyIsDown(SHIFT)) { // Check for the SHIFT key
    intendedAnimation = 'defend';
    defending = true;
  } else {
    defending = false;
  }
  
  // 2. Check for *Attack (Click)* 
  if (attackTriggered) {
    intendedAnimation = 'attack';
  } 
  // 3. Check for *Movement (Arrow Keys)* - Only if not attacking or defending
  else if (!defending) { 
    if (keyIsDown(LEFT_ARROW)) {
      x -= speed;
      intendedAnimation = 'run';
      flipped = true;
      moving = true;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      x += speed;
      intendedAnimation = 'run';
      flipped = false;
      moving = true;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
      if (keyIsDown(UP_ARROW)) y -= speed;
      if (keyIsDown(DOWN_ARROW)) y += speed;
      intendedAnimation = 'run';
      moving = true;
    }

    if (!moving) {
      intendedAnimation = 'idle';
    }
  }


  

  // Check if the animation state has changed
  if (intendedAnimation !== currentAnimation) {
    currentAnimation = intendedAnimation;
    currentFrame = 0; // Reset frame when switching animations
    frameCounter = 0;
  }

  frameCounter++;
  if (frameCounter >= frameRateFactor) {
    frameCounter = 0;
    
    let animLength = animations[currentAnimation].frames;
    
    // Advance frame and loop
    currentFrame = (currentFrame + 1) % animLength;

    // Logic to end the 'attack' animation (one-shot)
    if (currentAnimation === 'attack' && currentFrame === 0) {
      // The attack animation has completed a full loop
      attackTriggered = false; // Reset the trigger
      currentAnimation = 'idle'; // Immediately revert to idle
    }
  }




  let anim = animations[currentAnimation];
  let sx = currentFrame * spriteWidth;
  let sy = anim.row * spriteHeight;

  push();
  translate(x, y);

  // Apply scaling and flipping
  if (flipped) {
    scale(-1 * spriteScale, spriteScale);
  } else {
    scale(spriteScale, spriteScale);
  }

  // Draw the image: (img, dx, dy, dw, dh, sx, sy, sw, sh)
  image(
    spritesheet,
    0, 0,
    spriteWidth, spriteHeight,
    sx, sy,
    spriteWidth, spriteHeight
  );

  pop();
}

function mousePressed() {
  // Only trigger attack if the left button is pressed
  if (mouseButton === LEFT) {
    attackTriggered = true;
  }

}