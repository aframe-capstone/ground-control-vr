import React from 'react'
import {Entity} from 'aframe-react'

const countdownTimer = (numberOfSeconds, renderCountdown) => {
  var timeRemaining = numberOfSeconds
  var timeInterval = setInterval(() => {
    renderCountdown(timeRemaining)
    if (timeRemaining < 0) {
      clearInterval(timeInterval)
    }
    timeRemaining--
  }, 1000)
}

// SEND CURRENT TIME TO FIREBASE

const renderCountdown = (numberOfSeconds) => {
  console.log(numberOfSeconds)
  count.numberOfSeconds = numberOfSeconds
}

var hasBeenInvoked = true

const countdown = (seconds) => {
  if (hasBeenInvoked) {
    countdownTimer(seconds, renderCountdown)
    hasBeenInvoked = false
  }
}

const count = {
  countdown,
  numberOfSeconds: 0, 
}

export default count