const { least } = require('./util')

function botBrain (players) {
  const closestPlayer = players.reduce(least(p => Math.sqrt((p.x - this.x) ** 2 + (p.y - this.y) ** 2)))

  let hInp = 0
  let jInp = 0
  let dInp = 0

  // Semirandom jumping
  if ((Math.random() < 0.05 || (this.bouncy && Math.random() < 0.3)) && (this.onGround || this.vy > 2)) {
    jInp = 1
  }

  // Moving
  if (Math.random() < 0.8) {
    if (closestPlayer.y < this.y) {
      // Above me, watch out the way
      let dirToClosest = Math.sign(closestPlayer.x - this.x)
      hInp = -dirToClosest
    } else {
      // Im above them, get them!
      let dirToClosest = Math.sign(closestPlayer.x - this.x)
      hInp = dirToClosest
    }
  }

  // Ground Pound
  if (!this.onGround) {
    if (players.find(p => Math.abs(p.x - this.x) < 40 && p.y > this.y)) {
      dInp = 1
      jInp = 0
    }
  }

  // Crap!
  if (this.x < 130 || this.x > 810) {
    if (this.y < 600) {
      if (!this.isStupid) {
        // Above lowest platform
        let dirToCenter = Math.sign(450 - this.x)
        hInp = dirToCenter
      }
    } else {
      hInp = 0
      jInp = 1
    }
  }

  return {
    hInp: hInp * 0.75,
    jInp,
    dInp
  }
}

module.exports = botBrain
