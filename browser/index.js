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

document.addEventListener('buttondown', function() {
  var remote = document.querySelector('#daydream')
  // var ray = document.querySelector('#ray')
  // console.log('REMOTE IS', remote)
  // console.log(remote.components)
  // console.log('RAY IS', ray)
  console.log('EMITTING BUTTONDOWN')
  console.log('my raycaster', remote.components.raycaster)
  console.log(remote.components.raycaster.intersectedEls)
  remote.components.raycaster.intersectedEls[0].emit('click')
})

document.addEventListener('click', function() {
  console.log('I HEARD CLICK')
})

// document.addEventListener('raycaster-intersected', function(e) {
//   console.log('INTERSECTED!')
//   console.log(e)
//   console.log(e.el)
//   console.log(e.intersection)
// })
//
// document.addEventListener('raycaster-intersected-cleared', function(e) {
//   console.log('STOPPED INTERSECTING')
//   console.log(e)
//   console.log(e.el)
// })

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
      startRecording(this)
      break
    default:
      break
    }
  }

  handleKeyUp(e) {
    switch (e.keyCode) {
    case SPACE_BAR:
      stopRecording(this)
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
