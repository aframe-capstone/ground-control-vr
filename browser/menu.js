import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

const userCam = (<Entity primitive="a-camera" look-controls-enabled="true" wasd-controls-enabled="true">
  <Entity primitive="a-cursor" events={{}} animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
</Entity>)

export default class Menu extends React.Component {
  constructor(props) {
    super(props)
  }

  selectNavigator(e) {
    console.log("inside selectNavigator")
    e.preventDefault()
    console.log(e)
    this.props.setRole(true)
  }

  selectDriver(e) {
    console.log("inside selectDriver")
    e.preventDefault()
    this.props.setRole(false)
  }

  render() {
    return (
      <Entity>
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        <Entity cubemap='folder: assets/skybox/nebula-skybox/' />
        <Entity particle-system={{preset: 'snow', particleCount: 2000}}/>

        <Entity id="boxOne"
          geometry={{primitive: 'box'}}
          material={{opacity: 0.6}}
          animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
          position={{x: 1, y: 1, z: -3}}
          events={{click: this.selectNavigator.bind(this)}}>
          <Entity text={{value: 'NAVIGATE!', align: 'center'}} scale={{x: 5, y: 5, z: 5}} position={{x: 0, y: 1, z: 0}}/>
          <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
                  geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                  material={{color: '#24CAFF'}}/>
        </Entity>

        <Entity id="boxTwo"
          geometry={{primitive: 'box'}}
          material={{opacity: 0.6}}
          animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
          position={{x: -1, y: 1, z: -3}}
          events={{click: this.selectDriver.bind(this)}}>
          <Entity text={{value: 'DRIVE!', align: 'center'}} scale={{x: 5, y: 5, z: 5}} position={{x: 0, y: 1, z: 0}}/>
          <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
                  geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                  material={{color: '#24CAFF'}}/>
        </Entity>
        {userCam}
      </Entity>)
  }
}
