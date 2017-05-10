import setupDataBase from './firebase'
import Tuna from 'tunajs'
import toBuffer from 'typedarray-to-buffer'

/* global firebase AudioContext MediaRecorder URL FileReader Blob */

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
  const NASABeep = document.querySelector('#NASABeepAudioNode')
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

  function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length)
    var view = new Uint8Array(ab)
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i]
    }
    return ab
  }

  const playAudio = (dataArr) => {
    // var arrBuff = new Blob([dataArr])
    var audioBuff = toBuffer(dataArr)
    var audioArrBuff = toArrayBuffer(audioBuff)
    // audio.src = URL.createObjectURL(new Blob([dataArr]), {type: 'audio/webm'})
    var context = new AudioContext()
    var source = context.createBufferSource()

    source.onended = () => {
      NASABeep.play()
    }

    var tuna = new Tuna(context)

    var chorus = new tuna.Chorus({
      rate: 1.5,
      feedback: 0.2,
      delay: 0.5,
      bypass: 0
    })

    var filter = new tuna.Filter({
      frequency: 440, //20 to 22050
      Q: 70, //0.001 to 100
      gain: 0, //-40 to 40 (in decibels)
      filterType: "bandpass", //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
      bypass: 0
    })

    var overdrive = new tuna.Overdrive({
      outputGain: 0.5,         //0 to 1+
      drive: 0.7,              //0 to 1
      curveAmount: 1,          //0 to 1
      algorithmIndex: 0,       //0 to 5, selects one of our drive algorithms
      bypass: 0
    })

    source.connect(filter).connect(context.destination)

    // LISTEN FOR AUDIO STOPPED PLAYING EVENT and play 'beep sound' The ended event
    // The ended event is fired when playback has stopped because the end of the media was reached.

    context.decodeAudioData(audioArrBuff)
      .then(decodedAudio => {
        source.buffer = decodedAudio
        console.log('playing decoded audio', decodedAudio)
        source.start()
      })
    // console.log(URL.createObjectURL(new Blob([dataArr])))
    // audio.play()
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
