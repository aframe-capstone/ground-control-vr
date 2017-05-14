import 'aframe'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'babel-polyfill'
import { Entity, Scene } from 'aframe-react'
import React from 'react'
import ReactDOM from 'react-dom'
import Simulation from './simulation'
import SimulationContainer from './container/Simulation'
import Menu from './menu'
import Navigator from './navigator'
import {setUpRecording, mediaRecorder, startRecording, stopRecording} from './audio'
import loadAllAssets from './assets'
import FailureView from './failureView'
import { startSyncingPhaseAndStrikes } from './firebase'
import {ViveControllerLeft, ViveControllerRight} from './viveController'
import store from './store.jsx'
import { setNavigatorStatus, setDriverStatus } from './reducers/strike-phase.js'
import 'aframe-daydream-controller-component'

const SPACE_BAR = 32

/* global Event */

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
    console.log('isPressed', isPressed)
    if (isPressed) simulateSpaceBarPress(true)
    clearInterval(interval)
  }, 100) // Tenth of a second to make sure we catch start of recorded sentence
  remote.components.raycaster.intersectedEls && remote.components.raycaster.intersectedEls[0].emit('click')
})

document.addEventListener('buttonup', function() {
  simulateSpaceBarPress(false)
  console.log('I HEARD BUTTON UP')
  // end recording
})

document.addEventListener('click', function() {
  console.log('I HEARD CLICK')
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inSim: false,
      isNavigator: false
    }
    this.setRole = this.setRole.bind(this)
    this.selectNavigator = this.selectNavigator.bind(this)
    this.selectDriver = this.selectDriver.bind(this)
  }

  selectNavigator(e) {
    if (this.state.inSim) return // Blocks mysterious event handler from Menu from invoking in other views
    e.stopPropagation()
    e.preventDefault()
    this.setRole(true)
    startSyncingPhaseAndStrikes(true)
    store.dispatch(setNavigatorStatus(true))
  }

  selectDriver(e) {
    if (this.state.inSim) return // Blocks mysterious event handler from Menu from invoking in other views
    e.stopPropagation()
    e.preventDefault()
    this.setRole(false)
    startSyncingPhaseAndStrikes(false)
    store.dispatch(setDriverStatus(true))
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
    case SPACE_BAR:
      startRecording()
      break
    default:
      break
    }
  }

  handleKeyUp(e) {
    switch (e.keyCode) {
    case SPACE_BAR:
      stopRecording()
      break
    default:
      break
    }
  }

  setRole(isNavigator) {
    this.setState({ isNavigator: isNavigator, inSim: true })
    setUpRecording(isNavigator)
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this))
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
  }

  render() {
    return (
    <div>
      {this.state.isNavigator && <Navigator />}
      {!this.state.isNavigator && <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
          {loadAllAssets()}
          {!this.state.inSim && <Menu inSim={this.state.inSim} selectDriver={this.selectDriver} selectNavigator={this.selectNavigator} setRole={this.setRole}/>}
          {(!this.state.isNavigator && this.state.inSim) && <SimulationContainer />}
        </Scene>}
      </div>
    )
  }
}

export default App
