const Entity = require('./entity')
const tc = require('tinycolor2')

class SplatterEntity extends Entity {
  constructor (...args) {
    super(...args)

    // fade out
    this.alpha = 1
    this.time = -30
    this.fadeTime = 60
    this.depth = -0.5
    this.radius = 15

    this.ethereal = true
  }

  update (entities) {
    // Keep track of time and calculate alpha
    this.time++
    this.alpha = 1 - (this.time / this.fadeTime)

    // die when timer up
    if (this.time >= this.fadeTime) {
      this.remove = true
    }

    // Call super
    super.update(entities)
  }

  draw (ctx) {
    // Only draw-atop existing
    ctx.globalCompositeOperation = 'lighten'

    // Manipulate colour with alpha
    let c = tc(this.colour)
    c.setAlpha(this.alpha)
    ctx.fillStyle = c.toRgbString()

    // Draw us
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    // ctx.drawImage(splatterImg, this.x, this.y)

    // reset operation
    ctx.globalCompositeOperation = 'source-over'
  }
}

module.exports = SplatterEntity
