let spriteImg;
let sRows = 4;
let sCols = 8;
let sprites = [];
function preload() {
  spriteImg = loadImage("exp.png");
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
}
function draw() {
  background(220);
 
  if (mouseIsPressed) {
    image(sprites[frameCount%sprites.length], mouseX - 128, mouseY - 128);
    
  }

}
