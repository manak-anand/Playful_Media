function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(0,0,0,100);
  // let noiseValue=noise(0.05*frameCount + 1000);
  // let noiseMapped = map(noiseValue, 0, 1, 10,300);
  // ellipse(mouseX, mouseY, noiseMapped);
  for( let i=0; i<width; i+=5) {
     for(let j=0; j<height; j+=5) {

      let outputNoise = noise(0.003*(i-frameCount), 0.003*(j-frameCount));
      //print(outputNoise);
      fill(outputNoise*255);
      noStroke();
      rect(i,j,5,5);
     }
  }
}
