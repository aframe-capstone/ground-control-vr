import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

var Peer = require('simple-peer')
// var p = new Peer({ })

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
  var peer1 = new Peer({ initiator: location.hash === '#1', trickle: false, stream: stream });
  var peer2 = new Peer({ initiator: false, stream: stream });

  console.log("peer1", peer1);
  console.log("peer2", peer2);

  peer1.on('error', function (err) { console.log('error', err) })
  peer2.on('error', function (err) { console.log('error', err) })

  peer1.on('signal', function (data) {
    console.log('SIGNAL', JSON.stringify(data));
    document.querySelector('#outgoing').textContent = JSON.stringify(data);
    peer2.signal(data)
  })

  peer2.on('signal', function (data) {
    peer1.signal(data)
  })

  peer1.on('connect', function() {
    console.log("PEER ONE CONNECTED");
    peer1.send('SENT FROM PEER1 ' + Math.random());
  });

  peer2.on('stream', function (stream) {
    console.log('streaming from peer2')
    // got remote video stream, now let's show it in a video tag
    var video = document.querySelector('video')
    video.src = window.URL.createObjectURL(stream)
    video.play()
  })

  peer1.on('stream', function (stream) {
    console.log('streaming from peer1')
    // // got remote video stream, now let's show it in a video tag
    // var video = document.querySelector('video')
    // video.src = window.URL.createObjectURL(stream)
    // video.play()
  })

  peer2.on('connect', function() {
    console.log("PEER TWO CONNECTED");
    peer1.send('SENT FROM PEER2 ' + Math.random());
  });

  document.querySelector('form').addEventListener('submit', function (ev) {
    console.log("FORM SUBMITTED");
    ev.preventDefault();
    peer2.signal(JSON.parse(document.querySelector('#incoming').value));
  })
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
    super(props);
    this.state = {color: 'red'};
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

// // firebase="apiKey: AIzaSyBFBn5MIxtegDAL-zG6sFNReh_S8XQRTv8;
//                    authDomain: aframe-site.firebaseapp.com;
//                    databaseURL: https://aframe-site.firebaseio.com;
//                    storageBucket: aframe-site.appspot.com"
// firebase-broadcast="componentsOnce: mixin; components: position"
  render () {
    return (
      <Scene >
        <a-assets>
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
        </a-assets>

        {/* Example of firebase component mixin  */}
        <Entity  primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
        <Entity particle-system={{preset: 'snow', particleCount: 2000}}/>
        <Entity text={{value: 'Hello, A-Frame React!', align: 'center'}} position={{x: 0, y: 2, z: -1}}/>

        <Entity id="box"
          geometry={{primitive: 'box'}}
          material={{color: this.state.color, opacity: 0.6}}
          animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
          animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
          position={{x: 0, y: 1, z: -3}}
          events={{click: this.changeColor.bind(this)}}>
          <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
                  geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                  material={{color: '#24CAFF'}}/>
        </Entity>

        <Entity primitive="a-camera">
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));

 // & nodemon server.js browser/index.js --exec babel-node --presets=es2015,react",
