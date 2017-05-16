import React from 'react'
import {Entity} from 'aframe-react'


var hasNotBeenInvoked = true

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemaining: 10
    }
    this.countdownTimer = this.countdownTimer.bind(this)
    this.countdown(10)
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
      if (timeRemaining % 60 === 0){
        this.props.increaseSunSize()
      }

      if (timeRemaining <= 1) {
        clearInterval(timeInterval)
        this.props.setTimeLeft(false)
      }
      timeRemaining--
      this.setState({timeRemaining})
    }, 1000)
  }

  render() {
    return (<Entity text={{value: `Time till impact ${this.state.timeRemaining}`}}
      position={{
        x: 0.3,
        y: 0.15,
        z: -0.6
      }}/>)
  }
}
