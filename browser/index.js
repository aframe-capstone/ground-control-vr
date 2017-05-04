import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import Simulation from './simulation';
import Menu from './menu';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inSim: false,
      isNavigator: false
    };
    this.setRole = this.setRole.bind(this)
  }

  setRole(isNavigator) {
    console.log('CALLED setRole WITH', isNavigator)
    this.setState({ isNavigator: isNavigator, inSim: true });
  }

// // firebase="apiKey: AIzaSyBFBn5MIxtegDAL-zG6sFNReh_S8XQRTv8;
//                    authDomain: aframe-site.firebaseapp.com;
//                    databaseURL: https://aframe-site.firebaseio.com;
//                    storageBucket: aframe-site.appspot.com"
// firebase-broadcast="componentsOnce: mixin; components: position"

  render () {
    return (<Scene>
      <a-assets>
        <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
        <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
      </a-assets>
      { this.state.inSim ? <Simulation isNavigator={this.state.isNavigator} /> : <Menu setRole={this.setRole} /> }
    </Scene>);
  }
}

ReactDOM.render(<App />, document.querySelector('#sceneContainer'));
