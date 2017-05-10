import 'aframe'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'babel-polyfill'
import { Entity, Scene } from 'aframe-react'
import React from 'react'
import ReactDOM from 'react-dom'
import Simulation from './simulation'
import SimulationContainer from './container/Simulation';
import Menu from './menu'
import Navigator from './navigator'
import setUpAudio from './audio'
import loadAllAssets from './assets'
import FailureView from './failureView'

var isRecording = false

const startRecording = (app) => {
  if (isRecording && app.state.inSim) {
    console.log('trying to record while already recording or when outside sim')
  } else {
    console.log('starting to record!')
    var interval = setInterval(() => {
      console.log('stopped recording!')
      clearInterval(interval)
      isRecording = false
    }, 5000)
    isRecording = true
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
    case 32:
      startRecording(this)
      break
    default:
      break
    }
  }

  setRole(isNavigator) {
    this.setState({ isNavigator: isNavigator, inSim: true })
    // SETS UP AUDIO Navigator is initiator for signal. Arbritrary decision for this.
    setUpAudio(isNavigator)
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this))
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
