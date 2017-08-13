import $ from 'jquery'
const WebkitSpeechRecognition = window.webkitSpeechRecognition;
const recognition = new WebkitSpeechRecognition()
recognition.lang = 'en-US'
let NavigatorState
let sendingFirstMessage = true


function startTextToSpeech(isNavigator) {
  NavigatorState = isNavigator
  recognition.start()
}

function endingTextToSpeech() {
  recognition.stop()
}


recognition.onresult = function(event) {
  let message = {}
  if(NavigatorState) {
    message.text = 'Navigator : ' +event.results[0][0].transcript
    message.user = "Navigator"
    storeTranscript(message)
  } else {
    message.text = 'Driver : ' + event.results[0][0].transcript
    message.user = "Driver"
    storeTranscript(message)
  }
}

function storeTranscript(text) {
  $.ajax({
    type: "POST",
    url: STORE_TRANSCRIPT,
    data: {flag: sendingFirstMessage, payload: text},
    success: function(data) {
      console.log(data)
      sendingFirstMessage = false;
    },
    error: function(xhr, textStatus, error) {
      console.log(xhr)
      console.log(textStatus)
      console.log(error)
    }
  })
}

function toneAnalyzer(dialogue) {
  $.ajax({
    type: "POST",
    url: TONE_ANALYZER,
    data: 'dummy',
    success: function(data) {
      document.open("text/html", "replace");
      document.write(data);
      document.close();
    },
    error: function(xhr, textStatus, error) {
      console.log(xhr)
      console.log(textStatus)
      console.log(error)
    }
  })
}



export {startTextToSpeech, endingTextToSpeech, toneAnalyzer}
