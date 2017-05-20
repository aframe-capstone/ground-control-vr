import 'aframe'
import 'aframe-animation-component'
import 'babel-polyfill'
import { Entity, Scene } from 'aframe-react'
import React from 'react'
import Tutorial from './tutorial/tutorial'
import UserCam from './userCam'

const driverIntro = `Hello space pilot ...\n
We recieved your transmission for help from ground control. We'll patch you to an operator in a moment.\n
You'll need to follow instructions from our operator to get your ship functional again. Stay calm and don't crash into the sun!\n
*Click Text Anywhere To Continue*`

export default class Intro extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Entity>
        <Entity primitive='a-sound'
          src="#menuMusic"
          loop="true"
          autoplay="true"
          position="0 0 0" />
        <Entity primitive="a-light"
          type="ambient"
          color="#445451"/>
        <Entity primitive="a-light"
          type="point"
          intensity="2"
          position="2 4 4"/>
        <Entity cubemap='folder: assets/skybox/nebula-skybox/' />
        <Entity
          primitive='a-plane'
          opacity='0'
          visible='true'
          id='invisPlane'
          class='selectable'
          events={{click: this.props.goToNextState}}
          position={{x: 0, y: 1.75, z: -1.75}}
          scale={{x: 2, y: 2, z: 2}}
          text={{
            font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt',
            value: this.props.text,
            color: 'white'}} />
        <UserCam isDesktop={this.props.isDesktop} />
      </Entity>)
  }
}
