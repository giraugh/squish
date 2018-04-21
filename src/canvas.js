const create = (width, height) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  window.document.body.appendChild(canvas)
  const context = canvas.getContext('2d')
  return context
}

module.exports = create
