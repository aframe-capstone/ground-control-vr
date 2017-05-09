import Peer from 'simple-peer'

// Initialize firebase
var config = {
  apiKey: 'AIzaSyAoEAecAsSgktGQmv2dHhinVRrMhoUYiYg',
  authDomain: 'test-61ce3.firebaseapp.com',
  databaseURL: 'https://test-61ce3.firebaseio.com',
  projectId: 'test-61ce3',
  storageBucket: 'test-61ce3.appspot.com',
  messagingSenderId: '555633723470'
}

firebase.initializeApp(config)
console.log('FIREBASE initialized')

const setUpAudio = isNavigator => {
  navigator.getUserMedia = (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia)

  const gotMedia = stream => {
    let p
    const simplePeerRef = firebase.database().ref('SimplePeer/')
    const setHandlers = p => {
      p.on('close', () => {
        console.log('CLOSING CONNECTION AND EMPTYING DB')
        simplePeerRef.set({})
      })

      p.on('error', err => {
        console.log('error', err)
        simplePeerRef.set({})
      })

      p.on('connect', () => {
        console.log('CONNECTED')
        p.send('whatever' + Math.random())
      })

      p.on('data', data => {
        console.log('data: ' + data)
      })

      p.on('stream', stream => {
        console.log('streaming started:', stream)
        // got remote video stream, now let's show it in a video tag
        var audio = document.querySelector('audio')
        audio.src = window.URL.createObjectURL(stream)
        audio.play()
      })
    }

    if (isNavigator) {
      p = new Peer({ initiator: true, trickle: false, stream: stream })
      setHandlers(p);
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
                console.log('SIGNAL RECEIVED FOR NAVIGATOR');
              }
            })
          })
      })
    }
    else {
      p = new Peer({ initiator: false, trickle: false, stream: stream })
      setHandlers(p)
      simplePeerRef.once('child_added', snapshot => {
        console.log('SIGNAL RECEIVED FOR DRIVER');
        p.signal(JSON.parse(snapshot.val()));
        p.on('signal', signalData => {
          simplePeerRef.push(JSON.stringify(signalData));
          console.log('PUSHED SIGNAL TO FIREBASE');
        })
      });
    }

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
