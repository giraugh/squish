const initTogglingPlayers = () => {
  // Gets players (that are in order)
  let players = document.querySelectorAll('.player')
  players.forEach((el, i) => el.addEventListener('click', () => {
    const cl = [...el.classList]
    const enabled = cl.includes('enabled')

    // Change button state
    if (enabled) {
      el.classList = [...cl.filter(c => c !== 'enabled'), 'disabled'].join(' ')
    } else {
      el.classList = [...cl.filter(c => c !== 'disabled'), 'enabled'].join(' ')
    }

    console.log(window.entities.filter(e => e.spawn != null && e.fadeTime != null))

    // Kill or disable spawning
    if (enabled) {
      // Find player
      const players = window.entities.filter(e => e.number != null)
      const player = players.find(p => p.number === i)

      // Check if player is alive rn
      if (player) {
        player.doDie = true
      } else {
        const spawners = window.entities.filter(e => e.spawn != null && e.fadeTime != null)
        const spawner = spawners.find(s => s.spawn.number === i)
        if (spawner) {
          spawner.dontProgressTime = true
          spawner.time = 0
        } else {
          console.warn(`Couldnt find spawner w/ number ${i}`)
        }
      }
    } else {
      // TODO: FIND SPAWNER AND RESUME IT, set dontProgressTime to false
      const spawners = window.entities.filter(e => e.spawn != null && e.fadeTime != null)
      const spawner = spawners.find(s => s.spawn.number === i)
      if (spawner) {
        spawner.dontProgressTime = false
        spawner.time = 0
      } else {
        console.warn(`Couldnt find spawner w/ number ${i}`)
      }
    }
  }))
}

module.exports = initTogglingPlayers
