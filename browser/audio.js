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

const setUpAudio = isNavigator => {
  navigator.getUserMedia = (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

  const gotMedia = stream => {
    var p;
    const simplePeerRef = firebase.database().ref('SimplePeer/');
    const setCloseAndError = p => {
      p.on('close', () => {
        console.log('CLOSING CONNECTION AND EMPTYING DB')
        simplePeerRef.set({});
      })
      p.on('error', err => {
        console.log('error', err)
        simplePeerRef.set({});
      })
    }
    if ( isNavigator) {
      p = new Peer({ initiator: true, trickle: false, stream: stream })
      setCloseAndError(p);
      p.on('signal', signalData => {
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
      simplePeerRef.once('child_added', snapshot => {
        console.log('SINGAL RECEIVED');
        p.signal(JSON.parse(snapshot.val()));
        p.on('signal', signalData => {
          simplePeerRef.push(JSON.stringify(signalData));
          console.log('PUSHED SIGNAL TO FIREBASE');
        })
      });
    }

    p.on('connect', function () {
      console.log('CONNECTED');
      p.send('whatever' + Math.random());
    })

    p.on('data', function (data) {
      console.log('data: ' + data);
    })

    p.on('stream', function (stream) {
      console.log('streaming started')
      // got remote video stream, now let's show it in a video tag
      var audio = document.querySelector('audio');
      audio.src = window.URL.createObjectURL(stream);
      audio.play();
    })
  }

  navigator.getUserMedia({ audio: true }, gotMedia, err => { console.error(err) });
  // enable user media audio.
  // After have media
  // create a peer for THIS client
  // send stringified signal from client to server
  // send stringified signal to other peer
  // get signal back from other peer to original peer
  // on connect, begin voice streaming
}

export default setUpAudio;


