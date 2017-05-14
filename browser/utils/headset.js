/* global Event */

const setUpDayDreamAudio = () => {
  const simulateSpaceBarPress = (isDown) => {
    if (isDown) {
      var e = new Event('keydown')
      e.key=' '
      e.keyCode=e.key.charCodeAt(0)
      e.which=e.keyCode
      e.altKey=false
      e.ctrlKey=true
      e.shiftKey=false
      e.metaKey=false
      document.dispatchEvent(e)
    } else {
      var ev = new Event('keyup')
      ev.key=' '
      ev.keyCode=ev.key.charCodeAt(0)
      ev.which=ev.keyCode
      ev.altKey=false
      ev.ctrlKey=true
      ev.shiftKey=false
      ev.metaKey=false
      document.dispatchEvent(ev)
    }
  }

  document.addEventListener('buttondown', function() {
    var remote = document.querySelector('#daydream')
    var interval = setInterval(() => {
      var isPressed = document.querySelector('#daydream').components['daydream-controller'].controller.buttons[0].pressed
      if (isPressed) simulateSpaceBarPress(true) // Triggers start of recording
      clearInterval(interval)
    }, 100) // Tenth of a second to make sure we catch start of recorded sentence
    remote.components.raycaster.intersectedEls && remote.components.raycaster.intersectedEls[0].emit('click')
  })

  document.addEventListener('buttonup', function() {
    simulateSpaceBarPress(false) // Triggers end of recording
  })
}

export default setUpDayDreamAudio
