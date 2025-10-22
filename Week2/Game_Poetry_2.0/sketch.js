let stars = [], planets = [], bullets = [], texts = [], fragments = []
let spaceship, scrollSpeed = 0, hueShift = 0, gameStarted = false
let bgTop, bgBottom, bgMusic, posSound, negSound, emotionMeter

let emotionTypes = [
  { name: "Anxiety", color: "#D32F2F", type: "Negative" },
  { name: "Grief", color: "#0D47A1", type: "Negative" },
  { name: "Doubt", color: "#757575", type: "Negative" },
  { name: "Apathy", color: "#1A237E", type: "Negative" },
  { name: "Joy", color: "#FFEB3B", type: "Positive" },
  { name: "Clarity", color: "#00BCD4", type: "Positive" },
  { name: "Compassion", color: "#C51162", type: "Positive" },
  { name: "Hope", color: "#4CAF50", type: "Positive" }
]

function preload() {
  soundFormats('mp3')
  bgMusic = loadSound('0.mp3')
  posSound = loadSound('1.mp3')
  negSound = loadSound('2.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  bgTop = color(20, 30, 80)
  bgBottom = color(0)
  spaceship = new Spaceship()
  emotionMeter = new EmotionMeter()
  for (let i = 0; i < 200; i++) stars.push(new Star())
}

function draw() {
  drawGradient()
  for (let s of stars) { s.move(); s.show() }
  if (!gameStarted) { drawStartScreen(); return }
  spaceship.move(); spaceship.show()
  for (let b of bullets) { b.move(); b.show() }
  if (frameCount % 100 == 0) planets.push(new Planet())
  for (let p of planets) { p.move(); p.show() }
  for (let i = planets.length - 1; i >= 0; i--) {
    for (let j = bullets.length - 1; j >= 0; j--) {
      if (planets[i].hit(bullets[j]) && !planets[i].destroyed) {
        handleHit(planets[i])
        for (let n = 0; n < 20; n++) fragments.push(new Fragment(planets[i].x, planets[i].y, planets[i].color))
        planets[i].destroyed = true
        bullets.splice(j, 1)
        break
      }
    }
  }
  planets = planets.filter(p => !p.destroyed)
  for (let f of fragments) { f.update(); f.show() }
  fragments = fragments.filter(f => f.life > 0)
  for (let t of texts) { t.update(); t.show() }
  texts = texts.filter(t => t.life > 0)
  emotionMeter.show()
}

function drawGradient() {
  let shift = constrain(hueShift, -100, 100)
  let topR = red(bgTop) + shift, topG = green(bgTop) + shift * 0.5, topB = blue(bgTop) + shift
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1)
    let r = lerp(topR, red(bgBottom), inter), g = lerp(topG, green(bgBottom), inter), b = lerp(topB, blue(bgBottom), inter)
    stroke(r, g, b)
    line(0, y, width, y)
  }
  hueShift = lerp(hueShift, 0, 0.01)
}

function drawStartScreen() {
  fill(255)
  textAlign(CENTER, CENTER)
  textSize(32)
  text("SPACE OF EMOTIONS", width / 2, height / 2 - 50)
  textSize(20)
  text("Press any key to start", width / 2, height / 2)
  text("WASD to move | Click to shoot", width / 2, height / 2 + 40)
}

function keyPressed() {
  gameStarted = true
  if (!bgMusic.isPlaying()) { bgMusic.loop(); bgMusic.setVolume(0.4) }
}

function mousePressed() { if (gameStarted) spaceship.shoot() }

function handleHit(planet) {
  if (planet.category === "Positive") {
    hueShift += 50
    posSound.play()
    emotionMeter.add(10)
  } else {
    hueShift -= 80
    negSound.play()
    emotionMeter.add(-15)
  }
  texts.push(new FloatingText(planet.x, planet.y, planet.name, planet.color))
}

function windowResized() { resizeCanvas(windowWidth, windowHeight) }
