import { setupDataBase } from './firebase'
import processRadioTransmission from './processRadioTransmission'
import audioContext from './audioContext'
import {convertDataStreamToAudioArrayBuffer, convertBinaryToTypedArray} from './utils/audioUtils'

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

const setUpReferences = (roomName, isNavigator) => {
  getUserMedia()
  getDataBaseReferences(roomName)
  getFileReader(isNavigator)
  getAudioAndHUDNodes()
}

const setUpRecording = isNavigator => {
  const roomName = location.hash.substring(1, location.hash.length)
  setUpReferences(roomName, isNavigator)
  registerDatabaseEventListeners(isNavigator)
  navigator.getUserMedia({ audio: true }, gotMedia, err => { console.error(err) })
}

const gotMedia = stream => {
  mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'})
  registerMediaRecorderEventListeners(mediaRecorder)
}

const startRecording = () => {
  if (!mediaRecorder) return // prevents triggering recorder while outside simulation
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
  if (!mediaRecorder) return // prevents triggering recorder while outside simulation
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

const setupFileReader = (isNavigator) => {
  fileReader = new FileReader()
  fileReader.onloadend = () => {
    if (isNavigator) {
      navigatorMessagesDB.push(fileReader.result)
    } else {
      driverMessagesDB.push(fileReader.result)
    }
  }
  return fileReader
}

const listenForNewMessageAndPlay = (databaseReference) => {
  databaseReference.on('child_added', snapshot => {
    const newMessage = snapshot.val()
    const typedArray = convertBinaryToTypedArray(newMessage)
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

const convertAudioToBinary = (event) => {
  const audioData = event.data
  fileReader.readAsBinaryString(audioData)
}

const toggleHUDIndicatorVisible = (indicatorElement, turnOn) => {
  if (indicatorElement) indicatorElement.setAttribute('visible', turnOn)
}

const playAudio = (dataArr) => {
  const audioArrBuff = convertDataStreamToAudioArrayBuffer(dataArr)
  const source = audioContext.createBufferSource()
  // Event listener to play 'NASA Beep' at end of transmission
  source.onended = () => {
    NASABeep && NASABeep.play() // bulletproofing for VR headset
    audioSourceIsPlaying = false
    // Displays UI indicator if Driver
    toggleHUDIndicatorVisible(transmissionIncomingIndicator, false)
    if (audioQueue.length > 0) playAudio(audioQueue.shift())
  }
    // Transforms ArrayBuffer into AudioBuffer then plays
  processRadioTransmission(audioContext, source)

  audioContext.decodeAudioData(audioArrBuff)
    .then(decodedAudio => {
      audioSourceIsPlaying = true
      source.buffer = decodedAudio
      source.start()
      // Displays UI indicator if Driver
      toggleHUDIndicatorVisible(transmissionIncomingIndicator, true)
    })
    .catch(err => console.error('DECODE AUDIO DATA THREW: ', err))
}

const registerDatabaseEventListeners = (isNavigator) => {
  if (isNavigator) {
    listenForNewMessageAndPlay(driverMessagesDB)
  } else {
    listenForNewMessageAndPlay(navigatorMessagesDB)
  }
  registerOnExitMessageClearListener(isNavigator)
}

const registerOnExitMessageClearListener = (isNavigator) => {
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

const registerMediaRecorderEventListeners = (mediaRecorderInstance) => {
  mediaRecorderInstance.onstart = () => {
    toggleHUDIndicatorVisible(recordingIndicator, true)
    startRecordingBeep && startRecordingBeep.play() // bulletproofing for VR headset
  }
  mediaRecorderInstance.onstop = () => {
    toggleHUDIndicatorVisible(recordingIndicator, false)
  }
  mediaRecorderInstance.addEventListener('dataavailable', onRecordingReady)
}

/* SETUP */

const getAudioAndHUDNodes = () => {
  transmissionIncomingIndicator = document.querySelector('#transmissionIncomingIndicator')
  recordingIndicator = document.querySelector('#recordingIndicator')
}

const getUserMedia = () => {
  navigator.getUserMedia = getMediaFromUser()
}

const getFileReader = (isNavigator) => {
  fileReader = setupFileReader(isNavigator)
}

const getDataBaseReferences = (roomName) => {
  driverMessagesDB = setupDataBase(`${roomName}/Driver_Messages`)
  navigatorMessagesDB = setupDataBase(`${roomName}/Navigator_Messages/`)
}

const getMediaFromUser = () => (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia || navigator.mediaDevices.getUserMedia)

export {setUpRecording, mediaRecorder, startRecording, stopRecording}
