let images = [];
const GRID_SIZE = 100;
let noImages=4;

function preload() {
  for (let i = 0; i<noImages; i++) {
    let name = i+".png";
    images[i]=loadImage(name);
    
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  
  frameRate(2);
}

function draw() {
  for (let x = 0; x < width; x += GRID_SIZE) {
    for (let y = 0; y < height; y += GRID_SIZE) {
      let randomImage = random(images);
      image(randomImage, x, y, GRID_SIZE, GRID_SIZE);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}