var sprite_sheet;
var dog_anim;
function preload() {
  sprite_sheet= loadSpriteSheet('1.png',100,100,4);
  dog_anim= loadAnimation(sprite_sheet);
}




function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  clear();
  Animation(dog_anim,200,200);
}
