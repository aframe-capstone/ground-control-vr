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
<<<<<<< HEAD
import Intro from './intro.jsx'
import introText from './introText.js'
import {mediaRecorder, startRecording, stopRecording} from './audio'
import loadAllAssets from './assets'
import FailureView from './failureView'
import { startSyncingPhaseAndStrikes } from './firebase'
import {ViveControllerLeft, ViveControllerRight} from './viveController'
import store from './store.jsx'
import { setNavigatorStatus, setDriverStatus } from './reducers/strike-phase.js'
import 'aframe-daydream-controller-component'
import setUpDayDreamAudio from './utils/headset'

// AFRAME IMPORT SIDEFFECTS FILE. Import one time then import that file in other places

const SPACE_BAR = 32 // TODO: MOVE TO CONSTANTS.js file
const MENU = 1
const INTRO = 2
const INSTRUCTIONS = 3
const INGAME = 4

setUpDayDreamAudio()
=======

// Initialize firebase
var config = {
  apiKey: "AIzaSyAoEAecAsSgktGQmv2dHhinVRrMhoUYiYg",
  authDomain: "test-61ce3.firebaseapp.com",
  databaseURL: "https://test-61ce3.firebaseio.com",
  projectId: "test-61ce3",
  storageBucket: "test-61ce3.appspot.com",
  messagingSenderId: "555633723470"
};
firebase.initializeApp(config);
console.log('FIREBASE initialized');

navigator.getUserMedia = (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

navigator.getUserMedia({ audio: true }, gotMedia, function () { });

// enable user media audio.
// After have media
// create a peer for THIS client
// send stringified signal from client to server
// send stringified signal to other peer
// get signal back from other peer to original peer
// on connect, begin voice streaming

function gotMedia(stream) {
  var p;
  //distinguish between different rooms with something like SimplePeer/:roomId
  const simplePeerRef = firebase.database().ref('SimplePeer/');
  if (location.hash === '#1') {
    p = new Peer({ initiator: true, trickle: false, stream: stream })
    p.on('close', function () {
      console.log('CLOSING CONNECTION AND EMPTYING DB')
      simplePeerRef.set({});
    })
    p.on('error', function (err) {
      console.log('error', err)
      simplePeerRef.set({});
    })
    p.on('signal', function (signalData) {
      simplePeerRef.push(JSON.stringify(signalData))
        .then(() => {
          console.log('PUSHED SIGNAL TO DATABASE');
          let second = false;
          return simplePeerRef.limitToLast(2).on('child_added', snapshot => {
            if (second === false) {
              second = true;
            }
            else {
              p.signal(JSON.parse(snapshot.val()));
              console.log('SIGNAL RECEIVED');
            }
          })
        })
    })
  }
  else {
    p = new Peer({ initiator: false, trickle: false, stream: stream })
    p.on('close', function () {
      console.log('CLOSING CONNECTION AND EMPTYING DB')
      simplePeerRef.set({});
    })
    p.on('error', function (err) {
      console.log('error', err)
      simplePeerRef.set({});
    })
    simplePeerRef.once('child_added', function (snapshot) {
      console.log('SINGAL RECEIVED');
      p.signal(JSON.parse(snapshot.val()));
      p.on('signal', function (signalData) {
        simplePeerRef.push(JSON.stringify(signalData))
        console.log('PUSHED SIGNAL TO FIREBASE');
      })
    });
  }
  p.on('connect', function () {
    console.log('CONNECTED')
    p.send('whatever' + Math.random())
  })

  p.on('data', function (data) {
    console.log('data: ' + data)
  })

  p.on('stream', function (stream) {
    console.log('streaming started')
    // got remote video stream, now let's show it in a video tag
    var audio = document.querySelector('audio')
    audio.src = window.URL.createObjectURL(stream)
    audio.play()
  })
}
>>>>>>> 8e90235884363e9d126b383736666b7930a66868

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameState: MENU,
      isNavigator: false,
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

  // TODO: make if
  goToNextState(e) {
    e.stopPropagation()
    e.preventDefault()
    if(this.state.gameState === INTRO){
      this.setGameState(INSTRUCTIONS)
    }
    else if(this.state.gameState === INSTRUCTIONS){
      this.setGameState(INGAME)
    }
    else{
      console.error('ERROR: should not have called goToNextState in the state your in.')
    }
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
    this.setState({ isNavigator: isNavigator, gameState: INTRO })
  }

  setGameState(state) {
    this.setState({gameState: state})
  }

  componentWillMount() {
    // TODO: Move these to refs below
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this))
    document.removeEventListener('keyup', this.handleKeyUp.bind(this))
  }

  // TODO: Use refs or register event listeners on div at top
  // registered right on tags --> onKeyUp=this.handleKeyDown.bind(this)
  render() {
    // MENU
    if(this.state.gameState === MENU){
      return (
          <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
            {loadAllAssets()}
            <Menu inSim={this.state.inSim} selectDriver={this.selectDriver} selectNavigator={this.selectNavigator} setRole={this.setRole}/>
          </Scene>
      )
    }
    // NAVIGATOR
    // document.getElementById('boxOne').click()
    else if(this.state.isNavigator){
      if(this.state.gameState === INTRO){
        return(
            <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
              {loadAllAssets()}
              <Intro text={introText.navigatorIntro} goToNextState={this.goToNextState}/>
            </Scene>
        )
      }
      else if(this.state.gameState === INSTRUCTIONS){
        return(
            <Scene keyboard-shortcuts={{enterVR: true}} vr-mode-ui={{enabled: true}}>
              {loadAllAssets()}
              <Intro text={introText.generalInstructions} goToNextState={this.goToNextState}/>
            </Scene>
        )
      }
      else if(this.state.gameState === INGAME){
        return (
            <Navigator isNavigator={this.state.isNavigator}/>
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
