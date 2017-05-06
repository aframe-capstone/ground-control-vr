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
  var p;
  const simplePeerRef = firebase.database().ref('SimplePeer/');
  if(location.hash === '#1'){
    p = new Peer({ initiator: true, trickle: false })
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
      .then(() =>{
        console.log('PUSHED SIGNAL TO DATABASE');
        let second = false;
        return simplePeerRef.limitToLast(2).on('child_added', snapshot => {
          if(second === false){
            second = true;
          }
          else{
            p.signal(JSON.parse(snapshot.val()));
            console.log('SIGNAL RECEIVED');
          }
        })
      })
    })
  }
  else{
    p = new Peer({ initiator: false, trickle: false })
    p.on('close', function () {
      console.log('CLOSING CONNECTION AND EMPTYING DB')    
      simplePeerRef.set({});         
    })
    p.on('error', function (err) { 
      console.log('error', err) 
      simplePeerRef.set({});
    })
    simplePeerRef.once('child_added', function(snapshot) {
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
    var video = document.querySelector('video')
    video.src = window.URL.createObjectURL(stream)
    video.play()
  })
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inSim: false,
      isNavigator: false
    }
  }

  render() {
    return (
      <Scene>
      <a-assets>
        <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
      </a-assets>
      { this.state.inSim ? <Simulation isNavigator={this.state.isNavigator} /> : <Menu setRole={this.setRole} /> }
      </Scene>
    )
  }
}
// ReactDOM.render(<App />, document.querySelector('#sceneContainer'));