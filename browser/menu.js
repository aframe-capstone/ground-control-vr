import 'aframe'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'babel-polyfill'
import {Entity, Scene} from 'aframe-react'
import React from 'react'
import ReactDOM from 'react-dom'
import 'aframe-text-geometry-component'
import {DriverCam} from './cameras'
import UserCam from './userCam.jsx'

const boxes = (props) => (
  <Entity>
    <Entity>
      <Entity id="boxOne"
        class='selectable'
        geometry={{primitive: 'box'}}
        material={{opacity: 0.6}}
        animation__scale={{property: 'scale', dir: 'alternate', dur: 1000, loop: true, to: '1.1 1.1 1.1'}}
        position={{x: 1, y: 1, z: -3}}
        events={{click: props.selectNavigator}}>
        <Entity text={{value: 'GROUND CONTROL!', align: 'center'}} scale={{x: 5, y: 5, z: 5}} position={{x: 0, y: 1, z: 0}}/>
        <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 1000, loop: true, to: '2 2 2'}}
                geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                material={{color: '#24CAFF'}}/>
      </Entity>
      <Entity id="boxTwo"
        class='selectable'
        geometry={{primitive: 'box'}}
        material={{opacity: 0.6}}
        animation__scale={{property: 'scale', dir: 'alternate', dur: 1000, loop: true, to: '1.1 1.1 1.1'}}
        position={{x: -1, y: 1, z: -3}}
        events={{click: props.selectDriver}}>
        <Entity text={{value: 'PILOT!', align: 'center'}} scale={{x: 5, y: 5, z: 5}} position={{x: 0, y: 1, z: 0}} />
        <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 1000, loop: true, to: '2 2 2'}}
                geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                material={{color: '#24CAFF'}} />
      </Entity>
    </Entity>
  </Entity>
  )



export default class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDesktop : true
    }
  }

  render() {
    return (
      <Entity>
        {/*<Entity primitive='a-video' src="#sample-video" width="16" height="9" position="0 0 -20"></Entity>*/}
        <Entity primitive='a-sound' src="#menuMusic" loop="true" autoplay="true" position="0 0 0" />
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        <Entity cubemap='folder: assets/skybox/nebula-skybox/' />
        {/* <Entity rotation='-90 0 0' particle-system={{preset: 'snow', particleCount: 4000}}/> */}
        <a-entity id="GROUND-CONTROL" position="-5.78 3.5 -5.5" scale='2 2 2' text-geometry="value: GROUND CONTROL; font: #moduleFont" />
        {!this.props.inSim && boxes(this.props)}
        {!this.props.inSim && <UserCam isDesktop={this.props.isDesktop}/>}
      </Entity>)
  }
}
