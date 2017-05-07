import 'aframe'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'babel-polyfill'
import {Entity, Scene, Animation} from 'aframe-react'
import React from 'react'
import ReactDOM from 'react-dom'
import Peer from 'simple-peer'
import 'aframe-ui-widgets'
import 'aframe-fence-component'
import Sun from './sun'
import {DriverCam} from './cameras'
import {generatePanel} from './panels'

const warningLight = (<Entity id="warningLight" position="0 5.3 0.4" primitive="a-cone" geometry={{radiusBottom: 0.21, radiusTop: 0.33, height: 0.3}} opacity="0.4" transparent animation={{property: 'material.color', from: '#000', to: '#900', ease: 'linear', loop: 'true', direction: 'ease-in'}}>
  <Entity primitive="a-light" type="hemisphere" position="0, 0, 0" intensity='5' animation={{property: 'color', from: '#000', to: '#900', loop: 'true', ease: 'ease-in', direction: 'alternate'}} />
  {/* Uncomment this line to enable alarm sound (disabled to avoid going crazy while testing)<Entity primitive='a-sound' src="#alarm" loop="true" autoplay="true" position="0 0 0" /> */}
</Entity>)

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default class Simulation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      renderCockpit: true,
      cockpit: []
    }
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue']
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  stopInteriorRender() {
    this.setState({renderCockpit: false})
  }

  componentWillMount() {
    if (this.state.renderCockpit) {
      // Set interior's state here?
    }
    this.stopInteriorRender()
  }

  render() {
    return (
      <Entity >
        <Entity
          static-body
          obj-model={{obj: '#cockpit', mtl: '#cockpitMaterial'}}
          position={{x: 0, y: 4, z: 0}}
        />
        {generatePanel(-1.5, 2.5, 90)}
        {generatePanel(1.5, 2.5, -90)}
        {generatePanel(0, 0, 0)}
        {warningLight}
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
        {Sun}
        {DriverCam}
      </Entity>
    )
  }
}
