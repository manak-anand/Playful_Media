let x, y, size, ch;
x = 0;
y = 0;
size = 50;

function setup() {
  createCanvas(1500, 800);
  background("black");
}

function draw() {

  ch = random(0, 4);
  if (ch > 0 && ch < 1) {
    
    stroke(random(0,255),random(0,255),random(0,255));
    line(x, y, x + size, y + size);
  }
  else if (ch > 1 && ch < 2) {
   
   stroke(random(0,255),random(0,255),random(0,255));
    line(x + size, y, x, y + size);
  }
  else if (ch > 2 && ch < 3) {
    stroke(random(0,255),random(0,255),random(0,255));
    line(x + size, y, x, y + size);
    line(x, y, x + size, y + size);
  }
  else  {
   stroke(random(0,255),random(0,255),random(0,255));
    line(x + size / 2, y, x + size / 2, y + size);
    line(x, y + size / 2, x + size, y + size / 2);
  }

x=x+size;

if(x>width) {
  x=0;
  y=y+size;
}

}

