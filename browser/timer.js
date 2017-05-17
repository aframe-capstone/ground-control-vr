import React from 'react'
import {Entity} from 'aframe-react'


var hasNotBeenInvoked = true

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemaining: 300
    }
    this.countdownTimer = this.countdownTimer.bind(this)
    this.countdown(300)
  }

  countdown(seconds) {
    if (hasNotBeenInvoked) {
      hasNotBeenInvoked = false
      this.countdownTimer(seconds)
    }
  }

  componentWillUnmount() {
    if(this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  countdownTimer(numberOfSeconds) {
    var timeRemaining = numberOfSeconds
    var interval = setInterval(() => {
      if (timeRemaining % 1 === 0) {
        this.props.moveSunCloser()
      }

      if (timeRemaining <= 1) {
        clearInterval(interval)
        this.interval = null
        this.props.setTimeLeft(false)
      }
      else{
        timeRemaining--
        this.setState({timeRemaining})
      }
    }, 1000)
    this.interval = interval
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
