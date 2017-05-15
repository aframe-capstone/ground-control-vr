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
import setUpDayDreamAudio from './utils/headset'

const SPACE_BAR = 32

setUpDayDreamAudio()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: true,
      isNavigator: null,
    }
    this.setRole = this.setRole.bind(this)
    this.selectNavigator = this.selectNavigator.bind(this)
    this.selectDriver = this.selectDriver.bind(this)
  }

  selectNavigator(e) {
    if (!this.state.menu) return // Blocks mysterious event handler from Menu from invoking in other views
    e.stopPropagation()
    e.preventDefault()
    this.setRole(true)
    startSyncingPhaseAndStrikes(true)
    store.dispatch(setNavigatorStatus(true))
  }

  selectDriver(e) {
    if (!this.state.menu) return // Blocks mysterious event handler from Menu from invoking in other views
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
    this.setState({ isNavigator: isNavigator, menu: false })
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
    // MENU
    if(this.state.menu){
      return (
        <div>
          <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
            {loadAllAssets()}
            <Menu inSim={this.state.inSim} selectDriver={this.selectDriver} selectNavigator={this.selectNavigator} setRole={this.setRole}/>
          </Scene>
        </div>
      )
    }
    // NAVIGATOR
    // document.getElementById('boxTwo').click()
    else if(this.state.isNavigator){
      return (
        <div>
          <Navigator />
        </div>
      )
    }
    // DRIVER
    else if(!this.state.isNavigator){
      // document.getElementById('boxOne').click()
      return (
        <div>
          <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
            {loadAllAssets()}
            <SimulationContainer />
          </Scene>
        </div>
      )
      // ERROR
    } else {
      return (
        <div>ERROR: Can't have menu be true and isNavigator be set to a value</div>
      )
    }
  }

}

export default App
