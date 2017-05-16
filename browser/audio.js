import { setupDataBase } from './firebase'

import processRadioTransmission from './processRadioTransmission'
import audioContext from './audioContext'
import convertAudioToBinary from './utils/audioUtils'

let mediaRecorder // Globally available MediaRecorder, assigned in getUserMedia for setUpRecording (audio.js)
let fileReader // Globally available fileReader instance to convert binary string audio to buffer
let isRecording = false // prevents user from triggering startRecording()
const audioQueue = [] // queues 'radio transmissions' to prevent overlapping audio if many small messages are received
let audioSourceIsPlaying = false // Used to prevent message overlap
const audio = document.querySelector('#messageAudioNode') // AudioNode for radio tranmissions
const NASABeep = document.querySelector('#NASABeepAudioNode') // Quindar beep to communicate end of radio transmission
const startRecordingBeep = document.querySelector('#startRecordingBeepAudioNode') // Beep to indicate beginning of recording trasmission
let transmissionIncomingIndicator // HUD indicator of incoming message
let recordingIndicator // HUD indicator of recording in process
let driverMessagesDB
let navigatorMessagesDB

/* global firebase MediaRecorder location URL FileReader Blob */

const startRecording = () => {
  if (!isRecording) {
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
    console.error('trying to stop recording while not recording or outside sim')
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

const getMediaFromUser = () => (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia || navigator.mediaDevices.getUserMedia)

const listenForNewMessageAndPlay = (databaseReference) => {
  databaseReference.on('child_added', snapshot => {
    const newMessage = snapshot.val()
    const typedArray = new Uint8Array(newMessage.length)
    for (let i = 0; i < newMessage.length; i++) {
      typedArray[i] = newMessage.charCodeAt(i)
    }
    if (audioQueue.length === 0 && !audioSourceIsPlaying) {
      playAudio(typedArray)
    } else {
      audioQueue.push(typedArray)
    }
  })
}

const onRecordingReady = (e) => {
  convertAudioToBinary(e)
}

const toggleHUDIndicator = (indicatorName, turnOn) => {

}

const playAudio = (dataArr) => {
  const audioArrBuff = convertDataStreamToAudioArrayBuffer(dataArr)
  const source = audioContext.createBufferSource()
  // Event listener to play 'NASA Beep' at end of transmission
  source.onended = () => {
    NASABeep && NASABeep.play() // bulletproofing for VR headset
    audioSourceIsPlaying = false
    // Displays UI indicator if Driver
    if (transmissionIncomingIndicator) transmissionIncomingIndicator.setAttribute('visible', 'false')
    if (audioQueue.length > 0) playAudio(audioQueue.shift())

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

const setUpRecording = isNavigator => {
  navigator.getUserMedia = getMediaFromUser()

  const roomName = location.hash.substring(1, location.hash.length)
  driverMessagesDB = setupDataBase(`${roomName}/Driver_Messages`)
  navigatorMessagesDB = setupDataBase(`${roomName}/Navigator_Messages/`)
  fileReader = setupFileReader(isNavigator, navigatorMessagesDB, driverMessagesDB)
  transmissionIncomingIndicator = document.querySelector('#transmissionIncomingIndicator')
  recordingIndicator = document.querySelector('#recordingIndicator')

  registerEventListeners(isNavigator)

  navigator.getUserMedia({ audio: true }, gotMedia, err => { console.error(err) })
}

const registerEventListeners = (isNavigator) => {
  if (isNavigator) {
    listenForNewMessageAndPlay(driverMessagesDB)
  } else {
    listenForNewMessageAndPlay(navigatorMessagesDB)
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

  mediaRecorder.addEventListener('dataavailable', onRecordingReady)
}

export {setUpRecording, mediaRecorder, startRecording, stopRecording}
