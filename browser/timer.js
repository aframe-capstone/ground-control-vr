import React from 'react'
import {Entity} from 'aframe-react'

var hasNotBeenInvoked = true

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemaining: 180
    }
    this.countdownTimer = this.countdownTimer.bind(this)
    this.countdown(180)
  }

  countdown(seconds) {
    if (hasNotBeenInvoked) {
      hasNotBeenInvoked = false
      this.countdownTimer(seconds)
    }
  }

  countdownTimer(numberOfSeconds) {
    var timeRemaining = numberOfSeconds
    var timeInterval = setInterval(() => {
      if (timeRemaining < 0) {
        clearInterval(timeInterval)
      }
      timeRemaining--
      this.setState({timeRemaining})
    }, 1000)
  }

  render() {
    return (<Entity text={{value: `Time till impact ${this.state.timeRemaining}`}}
      position={{
        x: 0.35,
        y: 0.45,
        z: -0.6
      }}/>)
  }
}
