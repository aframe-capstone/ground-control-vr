import { setupDataBase } from './firebase'
import toBuffer from 'typedarray-to-buffer'
import processRadioTransmission from './processRadioTransmission'
import audioContext from './audioContext'

/* global firebase MediaRecorder location URL FileReader Blob */

let mediaRecorder
let isRecording = false
let interval
const audioQueue = []
var audioSourceIsPlaying = false // Used to prevent message overlap

const startRecording = () => {
  if (isRecording) {
  } else {
    mediaRecorder.start()
    setTimeout(() => {
      if (isRecording) {
        mediaRecorder.stop()
        isRecording = false
      }
    }, 5000)
    isRecording = true
  }
}

const stopRecording = () => {
  if (isRecording) {
    delayEndRecording()
  } else {
    console.log('trying to stop recording while not recording or outside sim')
  }
}

// Prevents MediaRecorder from cutting off message transmission
const delayEndRecording = () => {
  setTimeout(() => {
    mediaRecorder.stop()
    isRecording = false
  }, 400)
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
  navigator.msGetUserMedia || navigator.mediaDevices.getUserMedia)

  const audio = document.querySelector('#messageAudioNode')
  const NASABeep = document.querySelector('#NASABeepAudioNode')
  const startRecordingBeep = document.querySelector('#startRecordingBeepAudioNode')
  const roomName = location.hash.substring(1, location.hash.length)
  const driverMessagesDB = setupDataBase(`${roomName}/Driver_Messages`)
  const navigatorMessagesDB = setupDataBase(`${roomName}/Navigator_Messages/`)
  const fileReader = setupFileReader(isNavigator, navigatorMessagesDB, driverMessagesDB)
  const transmissionIncomingIndicator = document.querySelector('#transmissionIncomingIndicator')
  const recordingIndicator = document.querySelector('#recordingIndicator')

  const listenForNewMessageAndPlay = (databaseReference) => {
    databaseReference.on('child_added', snapshot => {
      var newMessage = snapshot.val()
      var typedArray = new Uint8Array(newMessage.length)
      for (var i=0; i < newMessage.length; i++) {
        typedArray[i] = newMessage.charCodeAt(i)
      }

      if (audioQueue.length === 0 && !audioSourceIsPlaying) {
        playAudio(typedArray)
      } else {
        audioQueue.push(typedArray)
      }
    })
  }

  function toArrayBuffer(buf) {
    var arrayBuff = new ArrayBuffer(buf.length)
    var view = new Uint8Array(arrayBuff)
    for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i]
    }
    return arrayBuff
  }

  const playAudio = (dataArr) => {
    var audioBuff = toBuffer(dataArr)
    var audioArrBuff = toArrayBuffer(audioBuff)
    var source = audioContext.createBufferSource()
    // Event listener to play 'NASA Beep' at end of transmission
    source.onended = () => {
      NASABeep && NASABeep.play() // bulletproofing for VR headset
      audioSourceIsPlaying = false
      // Displays UI indicator if Driver
      if (transmissionIncomingIndicator) transmissionIncomingIndicator.setAttribute('visible', 'false')
      if (audioQueue.length > 0) {
        playAudio(audioQueue.shift())
      }
    }

    processRadioTransmission(audioContext, source)

    // Transforms ArrayBuffer into AudioBuffer then plays
    audioContext.decodeAudioData(audioArrBuff)
      .then(decodedAudio => {
        audioSourceIsPlaying = true
        source.buffer = decodedAudio
        source.start()
        // Displays UI indicator if Driver
        if (transmissionIncomingIndicator) transmissionIncomingIndicator.setAttribute('visible', 'true')
      })
      .catch(err => console.error('DECODE AUDIO DATA THREW: ', err))
  }

  const gotMedia = stream => {
    mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'})
    mediaRecorder.onstart = () => {
      // Display recording indicator if driver
      if (recordingIndicator) recordingIndicator.setAttribute('visible', 'true')
      startRecordingBeep && startRecordingBeep.play() // bulletproofing for VR headset
    }

    mediaRecorder.onstop = () => {
      // Display recording indicator if driver
      if (recordingIndicator) recordingIndicator.setAttribute('visible', 'false')
    }

    window.addEventListener('beforeunload', () => {
      if (isNavigator) {
        navigatorMessagesDB.set({})
        driverMessagesDB.set({})
      } else {
        navigatorMessagesDB.set({})
        driverMessagesDB.set({})
      }
    })
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
