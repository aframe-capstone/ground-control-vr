import 'aframe'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'babel-polyfill'
import {Entity, Scene} from 'aframe-react'
import React from 'react'
import ReactDOM from 'react-dom'
import 'aframe-text-geometry-component'
import DriverCam from '../camera/DriverCam'
import UserCam from './userCam'
import Boxes from './boxes'

export default class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDesktop: true
    }
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
        {/* Optional Particle System Here */}
        <a-entity id="GROUND-CONTROL"
          position="-5.78 3.5 -5.5"
          scale='2 2 2'
          text-geometry="value: GROUND CONTROL; font: #moduleFont" />
        {!this.props.inSim && <Boxes selectNavigator={this.props.selectNavigator} selectDriver={this.props.selectDriver} />}
        {!this.props.inSim && <UserCam isDesktop={this.props.isDesktop}/>}
      </Entity>)
  }
}
