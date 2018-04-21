const setup = _ => {
  // Keyboard
  window.keys = {}
  window.onkeydown = (e) => {
    if (e.repeat) {
      window.keys[e.key] = 1
    } else {
      window.keys[e.key] = 2
    }
  }
  window.onkeyup = (e) => {
    window.keys[e.key] = 0
    if (e.key === ' ') {
      e.preventDefault()
    }
  }
}

module.exports = setup
