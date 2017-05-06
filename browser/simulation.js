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

const warningLight = (<Entity id="warning-light" position="0 5.3 0.4" primitive="a-cone" geometry={{radiusBottom: 0.21, radiusTop: 0.33, height: 0.3}} opacity="0.4" transparent animation={{property: 'material.color', from: '#000', to: '#900', ease: 'linear', loop: 'true', direction: 'ease-in'}}>
  <Entity primitive="a-light" type="hemisphere" position="0, 0, 0" intensity='5' animation={{property: 'color', from: '#000', to: '#900', loop: 'true', ease: 'ease-in', direction: 'alternate'}} />
  {/* Uncomment this line to enable alarm sound (disabled to avoid going crazy while testing)<Entity primitive='a-sound' src="#alarm" loop="true" autoplay="true" position="0 0 0" /> */}
</Entity>)

function generatePanel(xDimension, zDimension) {
  const panel = []
  for (let tempX = 0; tempX <= xDimension; tempX+=1) {
    for (let tempZ = 0; tempZ <= zDimension; tempZ+=1) {
      console.log('calling generatePanel')
      panel.push(generateModule(-1, 0, 0))
      panel.push(generateModule(0, 0, 0))
    }
  }
  return <Entity id='MyPanel' > {panel} </Entity>
}

function generateModule(initialXCoord, initialYCoord, initialZCoord) {
  const module = []
  let length = initialXCoord + 3
  for (var i = initialXCoord; i < length; i++) {
    initialXCoord+=0.3
    module.push(generateLever(initialXCoord, initialZCoord, 'red'))
  }
  module.push(<Entity geometry={{primitive: 'plane', width: '1', height: 'auto'}} id='ModuleName' rotation='-60 0 0' text={{font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt', value: 'Flux Capacitor'}} />)
  return module
}

function generateButton(x, z, color) {
  return <Entity ui-button color={color} position={{x: `${x}`, y: 0.02, z: `${z}`}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>
}

function generateLever(x, z, color) {
  return <Entity ui-toggle color={color} position={{x: `${x}`, y: 0.02, z: `${z}`}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>
}

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

  // Two panels are temporarily disabled for our alpha! Don't delete!
  render() {
    return (
      <Entity >
        <Entity static-body obj-model={{obj: '#cockpit', mtl: '#cockpitMaterial'}}
          position={{x: 0, y: 4, z: 0}}
          ></Entity>
        <Entity color="#213033"
          primitive="a-box" width="2.2" height="0.01" depth="0.8" rotation={{x: 60, y: 90, z: 0}} position={{x: -1.5, y: 3.5, z: 2.5}} >
          {generatePanel(1, 1)}
        </Entity>
        {/* <Entity color="#213033" primitive="a-box" width="2.2" height="0.01" depth="0.7" rotation={{x: 60, y: -90, z: 0}} position={{x: 1.5, y: 3.5, z: 2.5}} >
          {generatePanel(1,1)}
        </Entity>
        <Entity color="#213033" primitive="a-box" width="2.2" height="0.01" depth="0.7" rotation={{x: 60, y: 0, z: 0}} position={{x: 0, y: 3.5, z: 0}} >
          {generatePanel(1,1)}
        </Entity> */}
        {warningLight}
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
        {Sun}
        {DriverCam}
      </Entity>
    )
  }
}

const ExamplePanel = <Entity color="#213033" primitive="a-box" width="2.2" height="0.01" depth="0.7" rotation={{x: 60, y: 0, z: 0}} position={{x: 0, y: 4, z: 0}} >
  {generatePanel(1, 1)}</Entity>
