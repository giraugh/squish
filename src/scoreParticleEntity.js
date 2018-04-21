const Entity = require('./entity.js')

class ScoreParticleEntity extends Entity {
  constructor (...args) {
    // Call Super and get opts
    super(...args)
    let opts = args[4]

    // Get options
    let {
      number: _num = 1,
      range: _rng = 50
    } = opts

    this.number = _num
    this.range = _rng
    this.ethereal = true
    this.fadeTime = 15
    this.fade = this.fadeTime + 50
    this.ease = Math.random() * 0.4 + 0.1
    this.depth = -4
  }

  update (entities) {
    // Fade out
    this.fade--
    if (this.fade < 0) {
      this.remove = true
    }

    /* // Find Player
    const player = entities.find(e => e.isPlayer && e.colour === this.colour)
    if (player) {
      // Find Distance to player from us
      const dist = Math.sqrt((player.x - this.x) ** 2 + (player.y - this.y) ** 2)

      // If outside of range, snap to edge of range
      if (dist > this.range) {
        const dir = Math.atan2(this.y - player.y, this.x - player.x)
        const x = player.x + Math.cos(dir) * this.range
        const y = player.y + Math.sin(dir) * this.range
        this.x = lerp(this.x, x, this.ease)
        this.y = lerp(this.y, y, this.ease)
      }
    } */
  }

  draw (ctx) {
    // Draw circle for now
    ctx.fillStyle = this.colour
    ctx.globalAlpha = Math.max(0, this.fade / this.fadeTime)
    // ctx.beginPath()
    // ctx.arc(this.x, this.y, 15, 0, Math.PI * 2)
    // ctx.fill()
    ctx.font = '40px "Lato"'
    ctx.fillText(this.number, this.x, this.y)
    ctx.globalAlpha = 1
  }
}

module.exports = ScoreParticleEntity
