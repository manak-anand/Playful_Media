let waves = [];
const numWaves = 16;

const BG1_C1 = [10, 0, 20];
const BG2_C1 = [25, 10, 25];
const BG1_C2 = [0, 0, 0];
const BG2_C2 = [5, 0, 10];
const WAVE1_COLOR = [100, 100, 150]; 

function setup() {
    createCanvas(1200, 800);
    angleMode(RADIANS);
    colorMode(RGB, 255, 255, 255, 255); 
    frameRate(10);
    for (let i = 0; i < numWaves; i++) {
        let index = i;

        let yOffset = map(index, 0, numWaves - 1, height * 0.2, height * 0.9);
        let speed = map(index, 0, numWaves - 1, 0.01, 0.08); 
        
        let amp1 = map(index, 0, numWaves - 1, 5, 60);
        let freq1 = map(index, 0, numWaves - 1, 0.02, 0.05);
        let weight1 = map(index, 0, numWaves - 1, 0.5, 3);
        let alpha1 = map(index, 0, numWaves - 1, 50, 200);
        let color1 = color(WAVE1_COLOR[0], WAVE1_COLOR[1], WAVE1_COLOR[2], alpha1);

        let amp2 = map(index, 0, 15, 15, 65);
        let spikeAmp2 = map(index, 0, 15, 3, 25);
        let freq2 = map(index, 0, 15, 0.03, 0.08);
        let weight2 = map(index, 0, 15, 0.7, 3);
        let alpha2 = map(index, 0, 15, 80, 200);

        let redVal2 = map(index, 0, 15, 80, 180);
        let greenVal2 = map(index, 0, 15, 80, 40);
        let blueVal2 = map(index, 0, 15, 120, 0);
        let color2 = color(redVal2, greenVal2, blueVal2, alpha2);

        waves.push({
            yOffset: yOffset,
            speed: speed,

            amp1: amp1, freq1: freq1, weight1: weight1, color1: color1,
            
            amp2: amp2, freq2: freq2, weight2: weight2, color2: color2,
            spikeAmp2: spikeAmp2 
        });
    }
}

function drawBackground(tFactor) {
    let c1_r = lerp(BG1_C1[0], BG2_C1[0], tFactor);
    let c1_g = lerp(BG1_C1[1], BG2_C1[1], tFactor);
    let c1_b = lerp(BG1_C1[2], BG2_C1[2], tFactor);
    let interpolatedC1 = color(c1_r, c1_g, c1_b);
    
    let c2_r = lerp(BG1_C2[0], BG2_C2[0], tFactor);
    let c2_g = lerp(BG1_C2[1], BG2_C2[1], tFactor);
    let c2_b = lerp(BG1_C2[2], BG2_C2[2], tFactor);
    let interpolatedC2 = color(c2_r, c2_g, c2_b);

    for (let y = 0; y < height; y++) {
        let inter = map(y, 0, height, 0, 1);
        let c = lerpColor(interpolatedC1, interpolatedC2, inter);
        stroke(c);
        line(0, y, width, y);
    }
}

function draw() {
    drawBackground(0.5); 

    for (let i = 0; i < waves.length; i++) {
        let wave = waves[i];
        
        let currentWeight = lerp(wave.weight1, wave.weight2, 0.5); 
        let currentColor = lerpColor(wave.color1, wave.color2, 0.5);
        
        noFill();
        stroke(currentColor);
        strokeWeight(currentWeight);

        beginShape();
        for (let x = 0; x < width; x++) {
            let t = map(x, 0, width, 0, 1, true); 

            let currentAmp = lerp(wave.amp1, wave.amp2, t);
            let currentFreq = lerp(wave.freq1, wave.freq2, t);
            
            let currentSpikeAmp = lerp(0, wave.spikeAmp2, t);

            let sineVal = sin(x * currentFreq + frameCount * wave.speed) * currentAmp;
            let spikeVal = random(-currentSpikeAmp, currentSpikeAmp); 
            
            let y = wave.yOffset + sineVal + spikeVal;
            vertex(x, y);
        }
        endShape();
}
}