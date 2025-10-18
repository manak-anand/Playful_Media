let flowers= [];
function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(220);
  for(let i=0; i<flowers.length; i++) {
    flowers[i].moveFlower();
    flowers[i].drawFlower();
  }
}

  function mousePressed() {
    let tempFlower= new Flower(mouseX, mouseY, random(-5,5), random(5,5));
    flowers.push(tempFlower);
  }


