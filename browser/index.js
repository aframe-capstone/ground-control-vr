import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import Simulation from './simulation';
import Menu from './menu';
import Peer from 'simple-peer';
import Navigator from './navigator'

// Initialize firebase
var config = {
  apiKey: "AIzaSyAoEAecAsSgktGQmv2dHhinVRrMhoUYiYg",
  authDomain: "test-61ce3.firebaseapp.com",
  databaseURL: "https://test-61ce3.firebaseio.com",
  projectId: "test-61ce3",
  storageBucket: "test-61ce3.appspot.com",
  messagingSenderId: "555633723470"
};
firebase.initializeApp(config);
console.log('FIREBASE initialized');

navigator.getUserMedia = (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

navigator.getUserMedia({ audio: true }, gotMedia, function () { });

// enable user media audio.
// After have media
// create a peer for THIS client
// send stringified signal from client to server
// send stringified signal to other peer
// get signal back from other peer to original peer
// on connect, begin voice streaming

function gotMedia(stream) {
  var p;
  //distinguish between different rooms with something like SimplePeer/:roomId
  const simplePeerRef = firebase.database().ref('SimplePeer/');
  if (location.hash === '#1') {
    p = new Peer({ initiator: true, trickle: false, stream: stream })
    p.on('close', function () {
      console.log('CLOSING CONNECTION AND EMPTYING DB')
      simplePeerRef.set({});
    })
    p.on('error', function (err) {
      console.log('error', err)
      simplePeerRef.set({});
    })
    p.on('signal', function (signalData) {
      simplePeerRef.push(JSON.stringify(signalData))
        .then(() => {
          console.log('PUSHED SIGNAL TO DATABASE');
          let second = false;
          return simplePeerRef.limitToLast(2).on('child_added', snapshot => {
            if (second === false) {
              second = true;
            }
            else {
              p.signal(JSON.parse(snapshot.val()));
              console.log('SIGNAL RECEIVED');
            }
          })
        })
    })
  }
  else {
    p = new Peer({ initiator: false, trickle: false, stream: stream })
    p.on('close', function () {
      console.log('CLOSING CONNECTION AND EMPTYING DB')
      simplePeerRef.set({});
    })
    p.on('error', function (err) {
      console.log('error', err)
      simplePeerRef.set({});
    })
    simplePeerRef.once('child_added', function (snapshot) {
      console.log('SINGAL RECEIVED');
      p.signal(JSON.parse(snapshot.val()));
      p.on('signal', function (signalData) {
        simplePeerRef.push(JSON.stringify(signalData))
        console.log('PUSHED SIGNAL TO FIREBASE');
      })
    });
  }
  p.on('connect', function () {
    console.log('CONNECTED')
    p.send('whatever' + Math.random())
  })

  p.on('data', function (data) {
    console.log('data: ' + data)
  })

  p.on('stream', function (stream) {
    console.log('streaming started')
    // got remote video stream, now let's show it in a video tag
    var audio = document.querySelector('audio')
    audio.src = window.URL.createObjectURL(stream)
    audio.play()
  })
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