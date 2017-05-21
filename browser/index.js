import 'aframe'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'babel-polyfill'
import { Entity, Scene } from 'aframe-react'
import React from 'react'
import ReactDOM from 'react-dom'
import Simulation from './simulation'
import SimulationContainer from './container/Simulation'
import Menu from './menu/menu'
import Navigator from './navigator/navigator'
import Intro from './tutorial/intro'
import introText from './tutorial/introText'
import {mediaRecorder, startRecording, stopRecording} from './audio/audio'
import loadAllAssets from './assets/assets'
import { startSyncingPhaseAndStrikes } from './firebase/firebase'
import store from './store'
import { setNavigatorStatus, setDriverStatus } from './reducers/strike-phase'
import 'aframe-daydream-controller-component'
import stopDefaultAndPropagation from './utils/events'
import setUpDayDreamAudio from './vr/headset'
import {SPACE_BAR, MENU, INTRO, INSTRUCTIONS, INGAME} from './utils/constants'

setUpDayDreamAudio()

/* global screen */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    stopDefaultAndPropagation(e)
    this.setRole(true)
    startSyncingPhaseAndStrikes(true)
    store.dispatch(setNavigatorStatus(true))
  }

  selectDriver(e) {
    if (this.state.gameState !== MENU) return // Blocks mysterious event handler from Menu from invoking in other views
    stopDefaultAndPropagation(e)
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
    if (e.keyCode === SPACE_BAR) startRecording()
  }

  handleKeyUp(e) {
    if (e.keyCode === SPACE_BAR) stopRecording()
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
            <Menu inSim={this.state.inSim}
              selectDriver={this.selectDriver}
              selectNavigator={this.selectNavigator}
              setRole={this.setRole}
              isDesktop={this.state.isDesktop}/>
          </Scene>
      )
    } else if (this.state.isNavigator) {
      if (this.state.gameState === INTRO) {
        return (
            <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
              {loadAllAssets()}
              <Intro text={introText.navigatorIntro}
                goToNextState={this.goToNextState}
                isDesktop={this.state.isDesktop}/>
            </Scene>
        )
      } else if (this.state.gameState === INSTRUCTIONS) {
        return (
            <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
              {loadAllAssets()}
              <Intro text={introText.generalInstructions}
                goToNextState={this.goToNextState}
                isDesktop={this.state.isDesktop}/>
            </Scene>
        )
      } else if (this.state.gameState === INGAME) {
        return (
            <Navigator isNavigator={this.state.isNavigator}/>
        )
      }
    } else if (!this.state.isNavigator) {
      if (this.state.gameState === INTRO) {
        return (
            <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
              {loadAllAssets()}
              <Intro text={introText.driverIntro} goToNextState={this.goToNextState}/>
            </Scene>
        )
      } else if (this.state.gameState === INSTRUCTIONS) {
        return (
            <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
              {loadAllAssets()}
              <Intro text={introText.generalInstructions} goToNextState={this.goToNextState}/>
            </Scene>
        )
      } else if (this.state.gameState === INGAME) {
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
