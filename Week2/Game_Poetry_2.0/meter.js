



class EmotionMeter {
  constructor() { this.value = 50 } // start at balanced mid-point

  add(v) { this.value = constrain(this.value + v, 0, 100) }

  getState() {
    if (this.value < 10) return "Despair"
    else if (this.value < 20) return "Stressed"
    else if (this.value < 30) return "Anxious"
    else if (this.value < 40) return "Overwhelmed"
    else if (this.value < 50) return "Neutral"
    else if (this.value < 60) return "Balanced"
    else if (this.value < 70) return "Content"
    else if (this.value < 80) return "Happy"
    else if (this.value < 90) return "Joyful"
    else return "Ecstatic"
  }

  show() {
    let w = 250, h = 25
    let x = width / 2 - w / 2, y = 40
    stroke(255)
    noFill()
    rect(x, y, w, h, 10)
    noStroke()

    // color transitions from red (negative) to green (positive)
    let col = lerpColor(color("#D32F2F"), color("#4CAF50"), this.value / 100)
    fill(col)
    rect(x, y, map(this.value, 0, 100, 0, w), h, 10)

    // show emotional label
    fill(255)
    textSize(18)
    textAlign(CENTER, CENTER)
    text(this.getState(), width / 2, y - 15)
  }
}
