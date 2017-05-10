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
import {setUpRecording, mediaRecorder} from './audio'
import loadAllAssets from './assets'
import FailureView from './failureView'

const SPACE_BAR = 32

var isRecording = false
const startRecording = (app) => {
  if (isRecording && app.state.inSim) {
    console.log('trying to record while already recording or when outside sim')
  } else {
    mediaRecorder.start()
    console.log('starting to record!')
    var interval = setInterval(() => {
      console.log('stopped recording!')
      clearInterval(interval)
      mediaRecorder.stop()
      isRecording = false
    }, 5000)
    isRecording = true
  }
}

const stopRecording = (app) => {
  if (isRecording && app.state.inSim) {
    mediaRecorder.stop()
  } else {
    console.log('trying to stop recording while not recording or outside sim')
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inSim: false,
      isNavigator: false
    }
    this.setRole = this.setRole.bind(this)
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
    // SETS UP AUDIO Navigator is initiator for signal. Arbritrary decision for this.
    setUpRecording(isNavigator)
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this));    
  }

  render() {
    let destination = <Menu setRole={this.setRole}/>
    if (this.state.isNavigator) {
      destination = <Navigator/>
    } else if (this.state.inSim) {
      destination = <SimulationContainer />
    } else { destination = <Menu setRole = {this.setRole}/> }
    return (
    <div>
      {this.state.isNavigator ? <Navigator/> :
        <Scene>
          {loadAllAssets()}
          {destination}
        </Scene>}
      </div>
    )
  }
}

export default App
// ReactDOM.render(<App />, document.querySelector('#sceneContainer'));
