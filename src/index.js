const size = [1000, 800]
const main = require('./main')
const context = require('./canvas')(size[0], size[1])
require('./input')()
let backgroundColour = '#FFF'

window.size = size

const loop = _ => {
  context.fillStyle = backgroundColour
  context.fillRect(0, 0, size[0], size[1])
  main(context)
  window.requestAnimationFrame(loop)
}

loop()
