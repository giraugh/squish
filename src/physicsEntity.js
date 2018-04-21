const Entity = require('./entity')
const { rectanglesOverlap } = require('./util')

const wouldCollide = (me, them, xd, yd) => {
  let {x: ax, y: ay, w: aw, h: ah} = me
  let {x: bx, y: by, w: bw, h: bh} = them
  return rectanglesOverlap(ax + xd, ay + yd, aw, ah, bx, by, bw, bh)
}

const willCollide = (entities, me, xd, yd) =>
  entities.some(e => wouldCollide(me, e, xd, yd))

class PhysicsEntity extends Entity {
  constructor (_x, _y, _w, _h, _opts = {}) {
    super(_x, _y, _w, _h, _opts)
    const {
      gravity: _grav = 0.5,
      kinematic: _kin = false,
      ethereal: _ether = false,
      dontCollide: _dc = false
    } = _opts

    this.gravity = _grav
    this.kinematic = _kin
    this.ethereal = _ether
    this.dontCollide = _dc
    this.vx = 0
    this.vy = 0
  }

  willIntersect (entities, dx, dy) {
    // Only collide with 'real' entities
    let colliders = entities.filter(e => !(e.ethereal || false))

    // Return result
    return willCollide(colliders, this, dx, dy)
  }

  willIntersectWith (entity, dx, dy) {
    return wouldCollide(this, entity, dx, dy)
  }

  update (entities) {
    // Accelerate due to Gravity
    if (!(this.kinematic || false)) {
      this.vy += this.gravity
    }

    // Only collide with 'real' entities
    let colliders = entities.filter(e => !(e.ethereal || false))

    // If dont collide then just displace and be done with it
    if (this.dontCollide) {
      this.x += this.vx
      this.y += this.vy
      return
    }

    // No need to check displacement if kinematic
    if (this.kinematic) {
      return
    }

    // Horizontal Displacement
    if (!willCollide(colliders, this, this.vx, 0)) {
      this.x += this.vx
    } else {
      let a = 0
      while (!willCollide(colliders, this, Math.sign(this.vx), 0) && a < 100) {
        a++
        this.x += Math.sign(this.vx)
      }
      this.vx = 0
    }

    // Vertical Displacement
    if (!willCollide(colliders, this, 0, this.vy)) {
      this.y += this.vy
    } else {
      let a = 0
      while (!willCollide(colliders, this, 0, Math.sign(this.vy)) && a < 100) {
        a++
        this.y += Math.sign(this.vy)
      }
      this.vy = 0
    }
  }
}

module.exports = PhysicsEntity
