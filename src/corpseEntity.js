const Entity = require('./entity')
const tc = require('tinycolor2')
const { lerp } = require('./util')

const interp = x => Math.max(0, (0.5 * x) + Math.pow(1.8 * x - 1, 3))

class CorpseEntity extends Entity {
  constructor (...args) {
    // Has the same constructor signature
    super(...args)

    // fade out
    this.alpha = 1
    this.time = 0
    this.fadeTime = 20

    // no physics
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
    // Manipulate colour with alpha
    let a = interp(this.alpha)
    let c = tc(this.colour)
    c.setAlpha(a)
    ctx.fillStyle = c.toRgbString()

    // Calculate pos and size for squish effect
    let w = this.w
    let h = lerp(this.h, 0, 1 - a)
    let x = this.x + this.w / 2
    let y = this.y

    // Draw us
    ctx.fillRect(x - w / 2, y + (this.h - h), w, h)
  }
}

module.exports = CorpseEntity
