import setupDataBase from './firebase'
import 'tunajs'

 // context = new AudioContext()


/* global firebase MediaRecorder URL FileReader Blob */

let mediaRecorder

var isRecording = false

const startRecording = (app) => {
  if (isRecording && app.state.inSim) {
    console.log('trying to record while already recording or when outside sim')
  } else {
    mediaRecorder.start()
    console.log('starting to record!')
    var interval = setInterval(() => {
      clearInterval(interval)
      if(isRecording){
        console.log('STOPPED RECORDING BECUASE INTERVAL EXSPIRED!')
        mediaRecorder.stop()
        isRecording = false
      }
    }, 5000)
    isRecording = true
  }
}

const stopRecording = (app) => {
  if (isRecording && app.state.inSim) {
    console.log('STOPPED RECORDING BECAUSE SPACEBAR LIFTED')
    mediaRecorder.stop()
    isRecording = false
  } else {
    console.log('trying to stop recording while not recording or outside sim')
  }
}

const setupFileReader = (isNavigator, navigatorMessages, driverMessages) => {
  const fileReader = new FileReader()
  fileReader.onloadend = () => {
    if (isNavigator) {
      navigatorMessages.push(fileReader.result)
    } else {
      driverMessages.push(fileReader.result)
    }
  }
  return fileReader
}

const setUpRecording = isNavigator => {
  navigator.getUserMedia = (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia)

  const audio = document.querySelector('#messageAudioNode')
  const driverMessagesDB = setupDataBase('Driver_Messages/')
  const navigatorMessagesDB = setupDataBase('Navigator_Messages/')
  const fileReader = setupFileReader(isNavigator, navigatorMessagesDB, driverMessagesDB)

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
    console.log(URL.createObjectURL(new Blob([dataArr])))
    console.log(audio)
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

  const convertAudioToBinary = (event) => {
    var audioData = event.data
    fileReader.readAsBinaryString(audioData)
  }

  const onRecordingReady = (e) => {
    convertAudioToBinary(e)
  }

  if (isNavigator) {
    listenForNewMessageAndPlay(driverMessagesDB)
  } else {
    listenForNewMessageAndPlay(navigatorMessagesDB)
  }
  navigator.getUserMedia({ audio: true }, gotMedia, err => { console.error(err) })
}

export {setUpRecording, mediaRecorder, startRecording, stopRecording}
