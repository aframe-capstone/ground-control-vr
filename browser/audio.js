import { setupDataBase } from './firebase'
import toBuffer from 'typedarray-to-buffer'
import processRadioTransmission from './processRadioTransmission'
import $ from 'jquery'

/* global firebase AudioContext MediaRecorder location URL FileReader Blob */

let mediaRecorder
let isRecording = false
let interval
const audioQueue = []
var audioSourceIsPlaying = false // Used to prevent message overlap
var context = new AudioContext() // TODO: separate file for audio context imported by others look at REACT & WebAudio libraries

const startRecording = () => {
  if (isRecording) { // FIX THIS
  } else {
    mediaRecorder.start()
    interval = setInterval(() => { // TODO: USE TIMEOUT or GET RID OF TIMEOUT?
      clearInterval(interval)
      if (isRecording) {
        mediaRecorder.stop()
        isRecording = false
      }
    }, 5000) // TODO: remove timer
    isRecording = true
  }
}

const stopRecording = () => {
  if (isRecording) {
    if (interval) {
      clearInterval(interval)
    }
    delayEndRecording()
  } else {
    console.log('trying to stop recording while not recording or outside sim')
  }
}

// Prevents MediaRecorder from cutting off message transmission
const delayEndRecording = () => {
  var itvl = setInterval(() => { // TIMEOUT NOT INTERVAL
    mediaRecorder.stop()
    isRecording = false
    clearInterval(itvl)
  }, 400)
}

const setupFileReader = (isNavigator, navigatorMessages, driverMessages) => {
  const fileReader = new FileReader() // TODO: messagesReference instead of both nav and driver messages
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

  // const audio = document.querySelector('#messageAudioNode') Delete this?
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

      if (audioQueue.length === 0 && !audioSourceIsPlaying) { // QueueAudio function
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
    var source = context.createBufferSource()
    // Event listener to play 'NASA Beep' at end of transmission
    source.onended = () => {
      NASABeep && NASABeep.play() // bulletproofing for VR headset
      audioSourceIsPlaying = false
      // Displays UI indicator if Driver
      if (transmissionIncomingIndicator) transmissionIncomingIndicator.setAttribute('visible', 'false') // refactor to props with redux state
      if (audioQueue.length > 0) {
        playAudio(audioQueue.shift())
      }
    }

    processRadioTransmission(context, source)

    // Transforms ArrayBuffer into AudioBuffer then plays
    context.decodeAudioData(audioArrBuff)
      .then(decodedAudio => {
        audioSourceIsPlaying = true
        source.buffer = decodedAudio
        source.start()
        // Displays UI indicator if Driver
        if (transmissionIncomingIndicator) transmissionIncomingIndicator.setAttribute('visible', 'true') // refactor to props with redux state
      })
      .catch(err => console.error('DECODE AUDIO DATA THREW: ', err))
  }

  const gotMedia = stream => {
    mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'})
    mediaRecorder.onstart = () => {
      // Display recording indicator if driver
      if (recordingIndicator) recordingIndicator.setAttribute('visible', 'true')
      startRecordingBeep && startRecordingBeep.play() // bulletproofing for VR headset
      // Dispatch an event back to React to start recording
    }

    mediaRecorder.onstop = () => {
      // Hide recording indicator if driver
      if (recordingIndicator) recordingIndicator.setAttribute('visible', 'false')
    }

    $(window).on('beforeunload', () => { // Can we get rid of jQuery with addEventListener instead of on
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
    fileReader.readAsBinaryString(audioData) // move elements being closed over to arguments
  }

  const onRecordingReady = (e) => {
    convertAudioToBinary(e)
  }

  if (isNavigator) {
    listenForNewMessageAndPlay(driverMessagesDB)
  } else {
    listenForNewMessageAndPlay(navigatorMessagesDB)
  }
  navigator.getUserMedia({ audio: true }, gotMedia, err => { console.error(err) }) // refactor to promise syntax
}

// In general, even stuff like onEnd onStart can be promisified. Anything with finite start and end can be promisified.

export {setUpRecording, mediaRecorder, startRecording, stopRecording}
