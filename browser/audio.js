import setupDataBase from './firebase'
import toBuffer from 'typedarray-to-buffer'
import processRadioTransmission from './processRadioTransmission'

/* global firebase AudioContext MediaRecorder location URL FileReader Blob */

let mediaRecorder
let isRecording = false
let interval
let audioQueue = []
var context = new AudioContext()
var audioSourceIsPlaying = false;

const startRecording = (app) => {
  if (isRecording && app.state.inSim) {
    console.log('trying to record while already recording or when outside sim')
  } else {
    mediaRecorder.start()
    interval = setInterval(() => {
      clearInterval(interval)
      if (isRecording){
        mediaRecorder.stop()
        isRecording = false
      }
    }, 5000)
    isRecording = true
  }
}

const stopRecording = (app) => {
  if (isRecording && app.state.inSim) {
    if(interval) {
      clearInterval(interval)
    }
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
  const NASABeep = document.querySelector('#NASABeepAudioNode')
  const roomName = location.hash.substring(1, location.hash.length)
  const driverMessagesDB = setupDataBase(`${roomName}/Driver_Messages`)
  const navigatorMessagesDB = setupDataBase(`${roomName}/Navigator_Messages/`)
  const fileReader = setupFileReader(isNavigator, navigatorMessagesDB, driverMessagesDB)
  // audio.onpause = () =>{
  //   console.log('ON PAUSE LISTENER WAS INVOKED')
  //   if(audioQueue.length > 0){
  //     console.log('from inside ON PAUSE')
  //     playAudio(audioQueue.shift())
  //   }
  // }

  const listenForNewMessageAndPlay = (databaseReference) => {
    databaseReference.on('child_added', snapshot => {
      console.log('I detected a child added')
      var newMessage = snapshot.val()
      var typedArray = new Uint8Array(newMessage.length)
      for (var i=0; i < newMessage.length; i++) {
        typedArray[i] = newMessage.charCodeAt(i)
      }

      if (audioQueue.length === 0 && !audioSourceIsPlaying){
        console.log('from inside listen for messageandPlay')
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
    console.log('Audio source', source)
    // Event listener to play 'NASA Beep' at end of transmission
    source.onended = () => {
      NASABeep.play()
      audioSourceIsPlaying = false
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
        console.log('DECODED AUDIO IS ... ', decodedAudio)
        source.start()
      })
  }

  const gotMedia = stream => {
    mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'})
    mediaRecorder.onstart = () => {
      // TODO: play sound/visual indicator about starting to record
      console.log("RECORDER STARTED")
    }

    mediaRecorder.onstop = () => {
      // TODO: play sound/visual indicator about stopping to record
      console.log("RECORDER STOPPED")
    }

    window.onbeforeunload = () => {
      if (isNavigator) {
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
