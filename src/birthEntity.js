const Entity = require('./entity')
const PlayerEntity = require('./playerEntity')
const tc = require('tinycolor2')
const { lerp } = require('./util')

const interp = x => Math.max(0, (0.5 * x) + Math.pow(1.8 * x - 1, 3))

class BirthEntity extends Entity {
  constructor (...args) {
    // Has the same constructor signature
    super(...args)

    // Get spawn object
    let opts = args[4]
    this.spawn = opts.spawn

    // fade out
    this.alpha = 0
    this.time = 0
    this.fadeTime = 80

    // no physics
    this.ethereal = true
  }

  update (entities, { addEntity }) {
    // Keep track of time and calculate alpha
    this.time++
    this.alpha = (this.time / this.fadeTime)

    // die when timer up
    if (this.time >= this.fadeTime) {
      // Remove in the way
      entities
        .filter(e => e instanceof PlayerEntity)
        .forEach(p => {
          if (p.willIntersectWith(this, 0, 0)) {
            p.die(addEntity)
          }
        })

      // Remove me and create spawn
      this.remove = true
      if (this.spawn) { addEntity(this.spawn) }
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
    let w = lerp(this.w, 0, 1 - a)
    let h = lerp(this.h, 0, 1 - a)
    let x = this.x + this.w / 2
    let y = this.y + this.h / 2
    ctx.fillRect(x - w / 2, y - h / 2, w, h)
  }
}

module.exports = BirthEntity
