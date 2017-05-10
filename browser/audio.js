import Peer from 'simple-peer'

/* global firebase MediaRecorder URL FileReader Blob */

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

let mediaRecorder

const setUpRecording = isNavigator => {
  navigator.getUserMedia = (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia)

  const audio = document.querySelector('audio')

  const driverMessagesDB = firebase.database().ref('Driver_Messages/')
  const navigatorMessagesDB = firebase.database().ref('Navigator_Messages/')
  const gotMedia = stream => {
    mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'})
    mediaRecorder.onstart = () => {
      console.log("RECORDER STARTED")
    }
    mediaRecorder.onstop = () => {
      console.log("RECORDER STOPPED")
    }
    mediaRecorder.addEventListener('dataavailable', onRecordingReady)
  }

  const onRecordingReady = (e) => {
    const fileReader = new FileReader()
    var audioData = e.data
    fileReader.readAsBinaryString(audioData)

    fileReader.onloadend = () => {
      console.log('Pushing Audio to Firebase')
      if (isNavigator) {
        navigatorMessagesDB.push(fileReader.result)
      } else {
        driverMessagesDB.push(fileReader.result)
      }
    }
  }
  if (isNavigator) {
    driverMessagesDB.on('child_added', snapshot => {
      var newMessage = snapshot.val()
      var typedArray = new Uint8Array(newMessage.length)
      for (var i=0; i<newMessage.length; i++)
        typedArray[i] = newMessage.charCodeAt(i)
      console.log(typeof typedArray)
      console.log(typedArray)
      audio.src = URL.createObjectURL(new Blob([typedArray]), {type: 'audio/webm'})
      audio.play()
    })
  } else {
    navigatorMessagesDB.on('child_added', snapshot => {
      var newMessage = snapshot.val()
      var typedArray = new Uint8Array(newMessage.length)
      for (var i=0; i<newMessage.length; i++)
        typedArray[i] = newMessage.charCodeAt(i)
      console.log(typeof typedArray)
      console.log(typedArray)
      audio.src = URL.createObjectURL(new Blob([typedArray]), {type: 'audio/webm'})
      audio.play()
    })
  }
  navigator.getUserMedia({ audio: true }, gotMedia, err => { console.error(err) })
  // enable user media audio.
  // After have media
  // create a peer for THIS client
  // send stringified signal from client to server
  // send stringified signal to other peer
  // get signal back from other peer to original peer
  // on connect, begin voice streaming
}


// export default setUpAudio
export {setUpRecording, mediaRecorder}
