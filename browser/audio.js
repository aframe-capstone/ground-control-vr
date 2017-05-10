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

  const listenForNewMessageAndPlay = (databaseReference) => {
    databaseReference.on('child_added', snapshot => {
      var newMessage = snapshot.val()
      var typedArray = new Uint8Array(newMessage.length)
      for (var i=0; i < newMessage.length; i++) {
        typedArray[i] = newMessage.charCodeAt(i)
      }
      playAudio(typedArray)
    })
  }

  const playAudio = (dataArr) => {
    audio.src = URL.createObjectURL(new Blob([dataArr]), {type: 'audio/webm'})
    audio.play()
  }

  const gotMedia = stream => {
    mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'})
    mediaRecorder.onstart = () => {
      // TODO: play sound indicator about starting to record
      console.log("RECORDER STARTED")
    }

    mediaRecorder.onstop = () => {
      // TODO: play sound indicator about stopping to record
      console.log("RECORDER STOPPED")
    }

    window.onbeforeunload = () => {
      if(isNavigator){
        navigatorMessagesDB.set({})
        driverMessagesDB.set({})
      } else {
        navigatorMessagesDB.set({})        
        driverMessagesDB.set({})
      }
    }

    mediaRecorder.addEventListener('dataavailable', onRecordingReady)

  }

  const onRecordingReady = (e) => {
    const fileReader = new FileReader()
    var audioData = e.data
    fileReader.readAsBinaryString(audioData)

    fileReader.onloadend = () => {
      if (isNavigator) {
        navigatorMessagesDB.push(fileReader.result)
      } else {
        driverMessagesDB.push(fileReader.result)
      }
    }
  }
  if (isNavigator) {
    listenForNewMessageAndPlay(driverMessagesDB)
  } else {
    listenForNewMessageAndPlay(navigatorMessagesDB)
  }
  navigator.getUserMedia({ audio: true }, gotMedia, err => { console.error(err) })
}

export {setUpRecording, mediaRecorder}
