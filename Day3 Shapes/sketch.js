function setup() {
  createCanvas(1400, 800);
  background(0,0,60);
}

function draw() {
}

function mousePressed() {

  drawSnowMan(mouseX,mouseY);

}


function mouseDragged() {

  drawSnowMan(mouseX,mouseY);
}

  function drawSnowMan(x,y) {  
fill(235);
circle(x,y,random(100,150));
fill(250);
circle(x,y+150,random(200,300))
fill(255,0,0,150)
circle(x-25,y-25,20);
circle(x+25,y-25,20);
fill(HSB,90,200,200);
triangle(x,y,x-5,y+20,x+5,y+20);

  }













