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
import NavigatorContainer from './container/NavConsole.jsx'
import {setUpRecording, mediaRecorder, startRecording, stopRecording} from './audio'
import Intro from './intro.jsx'
import introText from './introText.js'
import loadAllAssets from './assets'
import FailureView from './failureView'
import { startSyncingPhaseAndStrikes } from './firebase'
import store from './store.jsx'
import { setNavigatorStatus, setDriverStatus} from './reducers/strike-phase.js'
//import controllerComponent from 'aframe-daydream-controller-component'
import setUpDayDreamAudio from './utils/headset'


const SPACE_BAR = 32
const MENU = 1
const INTRO = 2
const INSTRUCTIONS = 3
const INGAME = 4

setUpDayDreamAudio()

/* global screen */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inSim: false,
      spaceBarDown:false,
      gameState: MENU,
      isNavigator: false,
      isDesktop: true
    }
    this.setRole = this.setRole.bind(this)
    this.selectNavigator = this.selectNavigator.bind(this)
    this.selectDriver = this.selectDriver.bind(this)
    this.goToNextState = this.goToNextState.bind(this)
  }

  selectNavigator(e) {
    if (this.state.gameState !== MENU) return // Blocks mysterious event handler from Menu from invoking in other views
    e.stopPropagation()
    e.preventDefault()
    this.setRole(true)
    startSyncingPhaseAndStrikes(true)
    store.dispatch(setNavigatorStatus(true))
  }

  selectDriver(e) {
    if (this.state.gameState !== MENU) return // Blocks mysterious event handler from Menu from invoking in other views
    e.stopPropagation()
    e.preventDefault()
    this.setRole(false)
    startSyncingPhaseAndStrikes(false)
    store.dispatch(setDriverStatus(true))
  }

  goToNextState(e) {
    e.stopPropagation()
    e.preventDefault()
    if (this.state.gameState === INTRO) {
      this.setGameState(INSTRUCTIONS)
    } else if (this.state.gameState === INSTRUCTIONS) {
      this.setGameState(INGAME)
    } else {
      console.error('ERROR: should not have called goToNextState in the state your in.')
    }
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
    case SPACE_BAR:
      startRecording()
      store.dispatch({
        type:'SPACE_BAR_DOWN',
        spaceBarDown: true

      })
      break;
    default:
      break
    }
  }

  handleKeyUp(e) {
    switch (e.keyCode) {
    case SPACE_BAR:
      stopRecording()
      store.dispatch({
        type:'SPACE_BAR_DOWN',
        spaceBarDown: false
      })
      break;
    default:
      break
    }
  }

  setRole(isNavigator) {
    this.setState({ isNavigator: isNavigator, gameState: INTRO })
  }

  setGameState(state) {
    this.setState({gameState: state})
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this))
    if (screen.width < 1000) {
      this.setState({
        isDesktop: false
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this))
    document.removeEventListener('keyup', this.handleKeyUp.bind(this))
  }

  render() {

    // MENU
    if (this.state.gameState === MENU) {
      return (
          <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
            {loadAllAssets()}
            <Menu inSim={this.state.inSim} selectDriver={this.selectDriver} selectNavigator={this.selectNavigator} setRole={this.setRole} isDesktop={this.state.isDesktop}/>
          </Scene>
      )
    }
    // NAVIGATOR
    // document.getElementById('boxOne').click()
    else if (this.state.isNavigator){
      if (this.state.gameState === INTRO){
        return (
            <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
              {loadAllAssets()}
              <Intro text={introText.navigatorIntro} goToNextState={this.goToNextState} isDesktop={this.state.isDesktop}/>
            </Scene>
        )
      }
      else if (this.state.gameState === INSTRUCTIONS){
        return (
            <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
              {loadAllAssets()}
              <Intro text={introText.generalInstructions} goToNextState={this.goToNextState} isDesktop={this.state.isDesktop}/>
            </Scene>
        )
      }
      else if(this.state.gameState === INGAME){
        return (
            <NavigatorContainer/>
        )
      }
    }
    // DRIVER
    // document.getElementById('boxTwo').click()
    else if(!this.state.isNavigator){
      if(this.state.gameState === INTRO){
        return (
            <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
              {loadAllAssets()}
              <Intro text={introText.driverIntro} goToNextState={this.goToNextState}/>
            </Scene>
        )
      }
      else if(this.state.gameState === INSTRUCTIONS){
        return (
            <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
              {loadAllAssets()}
              <Intro text={introText.generalInstructions} goToNextState={this.goToNextState}/>
            </Scene>
        )
      }
      else if(this.state.gameState === INGAME){
        return (
            <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
              {loadAllAssets()}
              <SimulationContainer isNavigator={this.state.isNavigator} />
            </Scene>
        )
      }
    // ERROR
    } else {
      return (
        <div>ERROR: Shouldn't be able to get to this combination of state values.</div>
      )
    }
  }

}

export default App
