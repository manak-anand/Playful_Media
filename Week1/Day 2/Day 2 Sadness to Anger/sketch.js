let waves = [];

function setup() {
  createCanvas(1200, 800);

  for (let i = 0; i < 16; i++) {
    let index = i;
    let waveProps = {
      baseAmplitude: map(index, 0, 15, 15, 65),
      spikeAmplitude: map(index, 0, 15, 3, 25),
      frequency: map(index, 0, 15, 0.03, 0.08),
      speed: map(index, 0, 15, 0.025, 0.08),
      yOffset: map(index, 0, 15, height * 0.2, height * 0.9),
      strokeWeight: map(index, 0, 15, 0.7, 3),
      alpha: map(index, 0, 15, 80, 200),
    };

    let redVal = map(index, 0, 15, 80, 180);
    let greenVal = map(index, 0, 15, 80, 40);
    let blueVal = map(index, 0, 15, 120, 0);
    waveProps.color = color(redVal, greenVal, blueVal, waveProps.alpha);

    waves.push(waveProps);
  }
}

function draw() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c1 = color(25, 10, 25);
    let c2 = color(5, 0, 10);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }

  for (let i = 0; i < waves.length; i++) {
    let wave = waves[i];
    noFill();
    stroke(wave.color);
    strokeWeight(wave.strokeWeight);

    beginShape();
    for (let x = 0; x < width; x++) {
      let sineVal = sin(x * wave.frequency + frameCount * wave.speed) * wave.baseAmplitude;
      let spikeVal = random(-wave.spikeAmplitude, wave.spikeAmplitude);
      let y = wave.yOffset + sineVal + spikeVal;
      vertex(x, y);
    }
    endShape();
  }
}