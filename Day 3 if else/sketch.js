function setup() {
  createCanvas(1000, 800);
  background(0, 0, 220);
}

function draw() {

}
function mouseClicked() {
  if (mouseX < width / 2 && mouseY < height / 2) {

    fill("red");
    ellipse(mouseX, mouseY, 20, 20);
  }

  else if (mouseX > width / 2 && mouseY < height / 2) {

    fill("yellow");
    ellipse(mouseX, mouseY, 20, 40);

  }

  else if (mouseX < width / 2 && mouseY > height / 2) {

    fill("red");
    rect(mouseX, mouseY, 20, 10);
  }

  else {

    fill("yellow");
    rect(mouseX, mouseY, 20, 10);

  }


}
