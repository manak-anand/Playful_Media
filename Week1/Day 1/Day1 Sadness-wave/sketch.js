function setup() 
{
  createCanvas(600, 400);
  noLoop();
  let colorA = color(0, 0, 255); 
  let colorB = color(0); 
  for (let y = 0; y < height; y++) {
    let interp = map(y, 0, height, 0, 1);
    let c = lerpColor(colorA, colorB, interp);
    
    stroke(c);
    line(0, y, width, y); 
  }
  noStroke();
  fill(50); 
  let amplitude = 15;

  for (let y = 100; y < height; y += 60) 
  {
    beginShape();
    for (let x = 0; x <= width; x += 10) 
    {
      let wave = sin(x * 0.05 + y * 0.2) * amplitude;
      vertex(x, y + wave);
    }
    endShape();
    amplitude *= 1.2; 
  }
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
