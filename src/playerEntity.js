const PhysicsEntity = require('./physicsEntity')
const ParticleEntity = require('./particleEntity')
const ScoreParticleEntity = require('./scoreParticleEntity')
const CorpseEntity = require('./corpseEntity')
const botBrain = require('./botBrain')
const tc = require('tinycolor2')
const { lerp } = require('./util')
const { isDown, isPressed } = require('./input')

const particleNum = 30

class PlayerEntity extends PhysicsEntity {
  constructor (_x, _y, _w, _h, opts = {}) {
    super(_x, _y, _w, _h, opts)
    const {
      inputs: _inps,
      speed: _hspd = 2.3,
      jumpHeight: _jmph = 14,
      slamHeight: _slmh = 3,
      verticalFriction: _vfric = 0.01,
      horizontalFriction: _hfric = 0.2,
      spawnPlayer: _spwnp,
      number: _n,
      kills: _klls = 0,
      isBot: _isbt = true
    } = opts
    this.inputs = _inps
    this.hSpd = _hspd
    this.jmpHght = _jmph
    this.slmHght = _slmh
    this.hFric = _hfric
    this.vFric = _vfric
    this.jumps = 1
    this.jumpsMax = 2
    this.isPlayer = true
    this.spawnPlayer = _spwnp
    this.number = _n
    this.stretch = 1
    this.squeeze = 1
    this.depth = -1
    this.kills = _klls

    // Toggling stuff
    this.doDie = false

    // Bot Stuff
    this.timeSinceLastInput = 0
    this.becomeBotTimeout = 450
    this.isBot = _isbt
    this.onGround = false
    this.isStupid = Math.random() < 0.3
    this.bouncy = Math.random() < 0.2
  }

  die (addEntity, delayRespawn) {
    // Remove Player
    this.remove = true

    // Spawn Corpse
    addEntity(new CorpseEntity(this.x, this.y, this.w, this.h, { colour: this.getColour() }))

    // Spawn particles
    for (let i = 0; i < particleNum; i++) {
      let x = this.x + this.w / 2
      let y = this.y + this.h / 2
      let particle = new ParticleEntity(x, y, 9, { colour: this.getColour() })
      addEntity(particle)
    }

    // Spawn new player
    this.spawnPlayer(this.number, { isBot: this.isBot, kills: this.kills }, delayRespawn)
  }

  getInput (entities) {
    const hInp = +isDown(this.inputs, 'right') - +isDown(this.inputs, 'left')
    const jInp = isPressed(this.inputs, 'jump')
    const dInp = isDown(this.inputs, 'slam')

    if (hInp === 0 && !jInp && !dInp) {
      this.timeSinceLastInput += 1
      if (this.timeSinceLastInput > this.becomeBotTimeout) {
        this.isBot = true
        this.timeSinceLastInput = 0
      }
    } else {
      this.timeSinceLastInput = 0
      this.isBot = false
    }

    if (!this.isBot) {
      return {
        hInp,
        jInp,
        dInp
      }
    } else {
      // Get players
      const players = entities.filter(e => e.isPlayer && e !== this && !e.remove)

      // Are there any?
      if (players.length === 0) {
        return { hInp: 0, jInp: 0, dInp: 0 }
      }

      // Use botbrain
      return botBrain.bind(this)(players)
    }
  }

  update (entities, { addEntity }) {
    // Get player input
    const {
      hInp,
      jInp,
      dInp
    } = this.getInput(entities)

    // Slight Dash
    if (Math.sign(this.vx) !== hInp && hInp === 0) {
      this.vx += hInp * this.hSpd * 2.4
    }

    // Horizontal Movement
    this.vx += hInp * this.hSpd

    // Apply friction (damping)
    this.vx = lerp(this.vx, 0, this.hFric)
    this.vy = lerp(this.vy, 0, this.vFric)

    // Jumping
    if (this.jumps > 1 && jInp) {
      if (this.vy > 0) {
        this.vy = -this.jmpHght * 0.75
      } else {
        if (this.vy === 0) {
          this.vy -= this.jmpHght
        } else {
          this.vy -= this.jmpHght * 0.7
        }
      }
      this.jumps--
      this.stretch = 0.7
      this.squeeze = 1.3
    }

    // Reset stretch and squeeze
    this.stretch = lerp(this.stretch, 1, 0.1)
    this.squeeze = lerp(this.squeeze, 1, 0.1)

    // Slamming
    if (dInp) {
      this.vy += this.slmHght
    }

    // If toggled off
    if (this.doDie) {
      this.die(addEntity, true)
    }

    // Regain jumps & make splats
    if (this.willIntersect(entities, 0, 1)) {
      /*
      // Create Splats
      let x = this.x + this.w / 2
      let y = this.y + this.h
      let splatter = new SplatterEntity(x, y, 0, 0, { colour: this.colour })
      addEntity(splatter)
      */

      // Squishing and stuff
      if (dInp) {
        this.stretch = lerp(this.stretch, 1.3, 0.4)
        this.squeeze = lerp(this.squeeze, 0.7, 0.4)
      } else {
        this.stretch = lerp(this.stretch, 1.1, 0.2)
        this.squeeze = lerp(this.squeeze, 0.9, 0.2)
      }

      // reset jumps & gripTime
      this.jumps = this.jumpsMax
      this.gripTime = this.gripTimeMax

      // For bot
      this.onGround = true
    } else {
      this.stretch = lerp(this.stretch, 0.8, 0.2)
      this.squeeze = lerp(this.squeeze, 1.2, 0.2)

      // For bot
      this.onGround = false
    }

    // Kill other players
    const players = entities.filter(e => e.isPlayer && e !== this && !e.remove)
    for (let player of players) {
      if (this.willIntersectWith(player, 0, 1)) {
        // Jump Effect
        if (!dInp) {
          this.vy = -this.jmpHght * 0.9
          this.jumps = 2
          this.stretch = 0.7
          this.squeeze = 1.3
          player.squeeze = 0.7
          player.stretch = 1.3
        } else {
          // Increment kills
          this.kills++

          // Kill Player
          if (!this.doDie /* DONT DIE TWICE */) {
            player.die(addEntity)
          }

          // Spawn score particle
          addEntity(new ScoreParticleEntity(this.x, this.y - 10, 0, 0, {colour: this.getColour(), number: this.kills}))
        }
      }
    }

    // Fall out of world
    if (this.y - this.h > window.size[1]) {
      this.die(addEntity)
    }

    // Loop round world
    if ((!this.isBot && this.y < 650) || (this.isBot && this.y < 550)) {
      if (this.x > window.size[0]) { this.x = -this.w }
      if (this.x + this.w < 0) { this.x = window.size[0] }
    }

    // Push down
    if (this.y < 0) {
      this.vy += 1
    }

    // Update Physics
    super.update(entities)
  }

  getColour () {
    let c = tc(this.colour)
    if (this.isBot) { c.lighten(20) }
    return c.toRgbString()
  }

  draw (ctx) {
    ctx.fillStyle = this.getColour()
    let w = this.w * this.stretch
    let h = this.h * this.squeeze
    let x = this.x + ((1 - this.stretch) * this.w / 2)
    let y = this.y + ((1 - this.squeeze) * this.h)
    ctx.fillRect(x, y, w, h)
  }
}

module.exports = PlayerEntity
