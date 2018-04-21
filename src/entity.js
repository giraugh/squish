class Entity {
  constructor (_x, _y, _w, _h, { colour: _col = 'black', label: _lab = 'none' } = {}) {
    this.x = _x
    this.y = _y
    this.w = _w
    this.h = _h
    this.colour = _col
    this.label = _lab
    this.remove = false
    this.depth = 0
  }

  update (entities) {}

  draw (ctx) {
    ctx.fillStyle = this.colour
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
}

module.exports = Entity
