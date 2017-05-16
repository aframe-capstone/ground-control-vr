import 'aframe'
import 'aframe-animation-component'
import 'babel-polyfill'
import { Entity, Scene } from 'aframe-react'
import React from 'react'
import Tutorial from './tutorial.js'

const driverIntro = `Hello space pilot ...\n
We recieved your transmission for help from ground control. We\'ll patch you to an operator in a moment.\n
You\'ll need to follow instructions from our operator to get your ship functional again. Stay calm and don\'t crash into the sun!\n
*Click Text Anywhere To Continue*`

const UserCam = props => (<Entity id='menuCamera' position='0 0 0'>
  <a-entity id="daydream" daydream-controller raycaster="objects: .selectable; recursive: true">
    <a-cone id='ray' color='cyan' position='0 0 -2' rotation='-90 0 0' radius-bottom='0.005' radius-top='0.001' height='4' />
    <a-box id='position-guide' visible='false' position='0 0 -2' />
  </a-entity>
  <Entity primitive="a-camera" wasd-controls-enabled="true">
  {/* <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/> */}
  </Entity>
</Entity>)

export default class Intro extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Entity>
        <Entity primitive='a-sound' src="#menuMusic" loop="true" autoplay="true" position="0 0 0" />
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        <Entity cubemap='folder: assets/skybox/nebula-skybox/' />
        <Entity id='invisPlane'
        class='selectable'
        events={{click: this.props.goToNextState}}
        position={{x: 0, y: 1.75, z: -1.75}}
        scale={{x:2, y:2, z:2}}
        text={{
          font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt',
          value: this.props.text,
          color: 'white'}}/>
        <UserCam />
      </Entity>)
  }
}