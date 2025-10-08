function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  fill("red");
  rect(175, 175, 50, 50);
}
function mouseClicked() {
  if ((mouseX > 175 && mouseX < 225) && (mouseY < 225)) {
    console.log("its britney, bitch!")
  }
}