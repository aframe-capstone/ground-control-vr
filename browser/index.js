import 'aframe'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'babel-polyfill'
import { Entity, Scene } from 'aframe-react'
import React from 'react'
import ReactDOM from 'react-dom'
import Simulation from './simulation'
import Menu from './menu'
import Peer from 'simple-peer'
import Navigator from './navigator'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inSim: false,
      isNavigator: false
    }
    this.setRole = this.setRole.bind(this)
  }

  setRole(isNavigator) {
    this.setState({ isNavigator: isNavigator, inSim: true })
  }

  render() {

    let destination = null

    if(this.state.isNavigator){ destination = <Navigator/>}

    else if (this.state.inSim){destination = <Simulation/>}

    else destination = <Menu setRole = {this.setRole}/>

    return (
    <div>
      {this.state.isNavigator ? <Navigator/> : null}

      <Scene>
        <a-assets>
        <img id="panelTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
        <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
        <audio id="alarm" src="assets/sound/alarmloop.mp3"/>
        <audio id="transmissionBeep" src="assets/sound/NASAtransmissionbeep.mp3"/>
        <a-asset-item id="sunRaysOne" src="assets/sunrays/sun_rays1.dae" />
        <a-asset-item id="sunRaysTwo" src="assets/sunrays/sun_rays2.dae" />
        <a-asset-item id="cockpit" src="assets/cockpit/cockpit-05_obj.obj" />
        <a-asset-item id="cockpitMaterial" src="assets/cockpit/cockpit-05_obj.mtl" />
        {/* <a-asset-item id="moduleFont" src='https://cdn.aframe.io/fonts/Exo2Bold.fnt' /> */}
        </a-assets>

        !this.state.isNavigator ? {destination} : null

      </Scene>

      </div>
    )

  }
}

ReactDOM.render(<App />, document.querySelector('#sceneContainer'));
