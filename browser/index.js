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

navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

navigator.getUserMedia({ audio: true }, gotMedia, function () {});

// enable user media audio.
// After have media
// create a peer for THIS client
// send stringified signal from client to server
// send stringified signal to other peer
// get signal back from other peer to original peer
// on connect, begin voice streaming

function gotMedia (stream) {
  // var peer1 = new Peer({ initiator: location.hash === '#1', trickle: false, stream: stream });
  // var peer2 = new Peer({ initiator: false, stream: stream });
  //
  // console.log("peer1", peer1);
  // console.log("peer2", peer2);
  //
  // peer1.on('error', function (err) { console.log('error', err) })
  // peer2.on('error', function (err) { console.log('error', err) })
  //
  // peer1.on('signal', function (data) {
  //   console.log('SIGNAL', JSON.stringify(data));
  //   document.querySelector('#outgoing').textContent = JSON.stringify(data);
  //   peer2.signal(data)
  // })
  //
  // peer2.on('signal', function (data) {
  //   peer1.signal(data)
  // })
  //
  // peer1.on('connect', function() {
  //   console.log("PEER ONE CONNECTED");
  //   peer1.send('SENT FROM PEER1 ' + Math.random());
  // });
  //
  // peer2.on('stream', function (stream) {
  //   console.log('streaming from peer2')
  //   // got remote video stream, now let's show it in a video tag
  //   var video = document.querySelector('video')
  //   video.src = window.URL.createObjectURL(stream)
  //   video.play()
  // })
  //
  // peer1.on('stream', function (stream) {
  //   console.log('streaming from peer1')
  //   // // got remote video stream, now let's show it in a video tag
  //   // var video = document.querySelector('video')
  //   // video.src = window.URL.createObjectURL(stream)
  //   // video.play()
  // })
  //
  // peer2.on('connect', function() {
  //   console.log("PEER TWO CONNECTED");
  //   peer1.send('SENT FROM PEER2 ' + Math.random());
  // });
  //
  // document.querySelector('form').addEventListener('submit', function (ev) {
  //   console.log("FORM SUBMITTED");
  //   ev.preventDefault();
  //   peer2.signal(JSON.parse(document.querySelector('#incoming').value));
  // })
}

// p.on('connect', function () {
//   console.log('CONNECT')
//   p.send('whatever' + Math.random())
// })
//
// p.on('data', function (data) {
//   console.log('data: ' + data)
// })

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
    console.log('CALLED setRole WITH', isNavigator)
    this.setState({ isNavigator: isNavigator, inSim: true })
  }

  render() {
    return (<Scene>
      <a-assets>
        <img id="panelTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
        <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
        <audio id="alarm" src="assets/sound/alarmloop.mp3"/>
        <a-asset-item id="sunRaysOne" src="assets/sunrays/sun_rays1.dae" />
        <a-asset-item id="sunRaysTwo" src="assets/sunrays/sun_rays2.dae" />
        <a-asset-item id="cockpit" src="assets/cockpit/cockpit-05_obj.obj" />
        <a-asset-item id="cockpitMaterial" src="assets/cockpit/cockpit-05_obj.mtl" />
      </a-assets>
      { this.state.inSim ? <Simulation isNavigator={this.state.isNavigator} /> : <Menu setRole={this.setRole} /> }
    </Scene>)
  }
}

ReactDOM.render(<App />, document.querySelector('#sceneContainer'));
