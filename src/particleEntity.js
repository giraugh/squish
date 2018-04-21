const PhysicsEntity = require('./physicsEntity')
const SplatterEntity = require('./splatterEntity')
const force = 25

class ParticleEntity extends PhysicsEntity {
  constructor (_x, _y, _r, opts = {}) {
    super(_x, _y, 0, 0, opts)
    this.radius = _r
    this.dontCollide = true
    this.ethereal = true
    this.vx = (Math.random() * force) - (force / 2)
    this.vy = -Math.abs((Math.random() * force) - (force / 2))
    this.depth = -1.5
  }

  update (entities, { addEntity }) {
    // Only collide with obstacle entities
    let obstacles = entities.filter(e => e.label === 'obstacle')
    if (this.willIntersect(obstacles, this.vx, this.vy) || this.willIntersect(obstacles, 0, 0)) {
      // Remove me
      this.remove = true

      // Create Splat effect
      addEntity(new SplatterEntity(this.x, this.y, 0, 0, { colour: this.colour }))
    }

    // Remove when outside of level
    if (this.x < 0 || this.x > window.size[0] || this.y < 0 || this.y > window.size[1]) {
      this.remove = true
    }

    // Update like normal, (basically just move)
    super.update(entities)
  }

  draw (ctx) {
    ctx.fillStyle = this.colour
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

module.exports = ParticleEntity
