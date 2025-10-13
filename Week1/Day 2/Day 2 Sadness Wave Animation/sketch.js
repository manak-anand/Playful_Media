let waves = [];
let numWaves = 15;

function setup() {
  createCanvas(1200, 800);
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c1 = color(10, 0, 20);
    let c2 = color(0, 0, 0);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }

  for (let i = 0; i < numWaves; i++) {
    waves.push({
      index: i,
      amplitude: map(i, 0, numWaves - 1, 5, 60),
      frequency: map(i, 0, numWaves - 1, 0.02, 0.05),
      speed: map(i, 0, numWaves - 1, 0.01, 0.03),
      yOffset: map(i, 0, numWaves - 1, height * 0.2, height * 0.9),
      strokeWeight: map(i, 0, numWaves - 1, 0.5, 3),
      alpha: map(i, 0, numWaves - 1, 50, 200)
    });
  }
}

function draw() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c1 = color(10, 0, 20);
    let c2 = color(0, 0, 0);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }

  for (let i = 0; i < waves.length; i++) {
    let wave = waves[i];
    
    noFill();
    stroke(100, 100, 150, wave.alpha);
    strokeWeight(wave.strokeWeight);

    beginShape();
    for (let x = 0; x < width; x++) {
      let y = wave.yOffset + sin(x * wave.frequency + frameCount * wave.speed) * wave.amplitude;
      vertex(x, y);
    }
    endShape();
  }
}