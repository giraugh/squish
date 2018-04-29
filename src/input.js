const orientationInputRamp = (x, s = 1) =>
  Math.pow(0.6 * x, 6) + Math.abs(x) * Math.sign(x) * s

const setup = _ => {
  // Keyboard
  window.keys = {}
  window.orientationInput = {}
  window.touches = {}
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
  window.ontouchstart = (e) => {
    for (let touch of e.targetTouches) {
      let side = touch.clientX < (window.innerWidth / 2) ? 'left' : 'right'
      window.touches[side] = 2
      e.preventDefault()
    }
  }
  window.ontouchend = (e) => {
    for (let touch of e.changedTouches) {
      let side = touch.clientX < (window.innerWidth / 2) ? 'left' : 'right'
      window.touches[side] = 0
      e.preventDefault()
    }
  }
  window.ondeviceorientation = (e) => {
    let x = e.beta
    let y = e.gamma
    let z = e.alpha

    z = (z - 180) / 180
    y = y / 90
    x = x / 180

    const s = 2
    x = orientationInputRamp(x, s)
    y = orientationInputRamp(y, s)
    z = orientationInputRamp(z, s)

    window.orientationInput['x'] = x
    window.orientationInput['y'] = y
    window.orientationInput['z'] = z
  }
}

const isDown = (inputs, name) => {
  let input = inputs[name]
  let checks = Array.isArray(input) ? input : [input]
  return checks.map((i) => {
    switch (i.type) {
      case 'keyboard':
        let r = window.keys[i.key] || 0
        if (r > 0) { window.keys[i.key] = 1 }
        return r > 0
      case 'orientation':
        const o = window.orientationInput[i.index]
        if (Math.sign(i.sign) === Math.sign(o)) {
          return Math.abs(o)
        } else {
          return 0
        }
      case 'touch':
        let t = window.touches[i.side] || 0
        if (t > 0) { window.touches[i.side] = 1 }
        return t > 0
    }
  }).find(i => i !== 0 && i !== false) || 0
}

const isPressed = (inputs, name) => {
  let input = inputs[name]
  let checks = Array.isArray(input) ? input : [input]
  return checks.map((i) => {
    switch (i.type) {
      case 'keyboard':
        let r = window.keys[i.key] || 0
        if (r > 0) { window.keys[i.key] = 1 }
        return r === 2
      case 'touch':
        let t = window.touches[i.side] || 0
        if (t > 0) { window.touches[i.side] = 1 }
        return t === 2
    }
  }).find(i => i !== 0 && i !== false) || 0
}

const inputs = [
  {
    left: [{
      type: 'keyboard',
      key: 'a'
    }, {
      type: 'orientation',
      sign: -1,
      index: 'y'
    }],
    right: [{
      type: 'keyboard',
      key: 'd'
    }, {
      type: 'orientation',
      sign: 1,
      index: 'y'
    }],
    jump: [{
      type: 'keyboard',
      key: 'w'
    }, {
      type: 'touch',
      side: 'left'
    }],
    slam: [{
      type: 'keyboard',
      key: 's'
    }, {
      type: 'touch',
      side: 'right'
    }]
  },
  {
    left: {
      type: 'keyboard',
      key: 'ArrowLeft'
    },
    right: {
      type: 'keyboard',
      key: 'ArrowRight'
    },
    jump: {
      type: 'keyboard',
      key: 'ArrowUp'
    },
    slam: {
      type: 'keyboard',
      key: 'ArrowDown'
    }
  },
  {
    left: {
      type: 'keyboard',
      key: 'j'
    },
    right: {
      type: 'keyboard',
      key: 'l'
    },
    jump: {
      type: 'keyboard',
      key: 'i'
    },
    slam: {
      type: 'keyboard',
      key: 'k'
    }
  },
  {
    left: {
      type: 'keyboard',
      key: 'f'
    },
    right: {
      type: 'keyboard',
      key: 'h'
    },
    jump: {
      type: 'keyboard',
      key: 't'
    },
    slam: {
      type: 'keyboard',
      key: 'g'
    }
  }
]

module.exports = {
  setup,
  inputs,
  isDown,
  isPressed
}
