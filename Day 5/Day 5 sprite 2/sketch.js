let spriteImg;
let sRows = 7;
let sCols = 8;
let sprites = [];
let circles = [];

function preload() {
  spriteImg = loadImage("ext.png");
}

function setup() {
  createCanvas(2048, 1024);
  let sWidth = spriteImg.width / sCols;
  let sHeight = spriteImg.height / sRows;
  for (let i = 0; i < sRows; i++) {
    for (let j = 0; j < sCols; j++) {
      sprites[sprites.length] = spriteImg.get(j * sWidth, i * sHeight, sWidth, sHeight);
    }
  }

  // Define circles: { x, y, r }
  circles.push({ x: 300, y: 500, r: 200 }); // Circle 1
  circles.push({ x: 700, y: 500, r: 150 }); // Circle 2
  circles.push({ x: 1200, y: 500, r: 250 }); // Circle 3
}

function draw() {
  background(220);

  // Draw the circles
  fill(255, 100, 100, 150);
  noStroke();
  for (let c of circles) {
    ellipse(c.x, c.y, c.r * 2);
  }

  if (mouseIsPressed) {
    let isInsideAnyCircle = false;

    // Check if the mouse is inside ANY circle
    for (let c of circles) {
      let d = dist(mouseX, mouseY, c.x, c.y);
      if (d <= c.r) {
        // The mouse is inside this circle
        isInsideAnyCircle = true;
        break; // Stop checking; we found a trigger
      }
    }

    // Trigger the explosion if the mouse is inside ANY circle
    if (isInsideAnyCircle) {
      image(sprites[frameCount % sprites.length], mouseX - 128, mouseY - 128, 256, 256);
    }
  }
}