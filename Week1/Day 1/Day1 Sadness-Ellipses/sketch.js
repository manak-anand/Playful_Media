function setup() {
  createCanvas(500, 500);
  background(20, 25, 35);
  noLoop();

  let colors = [
    color(40, 50, 70, 100),
    color(60, 70, 80, 150),
    color(30, 40, 50, 200),
    color(20, 25, 30, 220),
    color(70, 70, 75, 80)
  ];

  noStroke();

  fill(colors[3]);
  ellipse(width / 2, height - 80, 400, 280);
  ellipse(width / 2 + 30, height - 50, 300, 200);

  fill(colors[2]);
  ellipse(width / 2 - 50, height / 2 + 80, 350, 220);
  
  fill(colors[1]);
  ellipse(width / 2 + 60, height / 2, 300, 180);

  fill(colors[0]);
  ellipse(width / 2, height / 2 - 50, 150, 220);

  ellipse(width / 2 + 20, height / 2 - 20, 120, 180);
  
  fill(colors[4]);
  ellipse(width / 2 - 80, 150, 80, 100);
  
  fill(colors[2]);
  ellipse(width/2 - 20, height - 150, 180, 130);

  fill(20, 25, 35, 30);
  rect(0, 0, width, height);
}