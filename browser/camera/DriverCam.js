import React from 'react'
import {Entity} from 'aframe-react'
import Timer from '../components/timer'
import TransmissionIncoming from '../UI/transmissionIncoming'
import RecordingIndicator from '../UI/recordingIndicator'
import Failure from '../UI/failure'
import Success from './UI/success'
import '../utils/fps-cursor'
import DayDreamController from '../vr/dayDreamController'

// REMOVED USER HEIGHT IN CAMERA HERE
const DriverCam = props => {
  let endGameScreen
  if (props.phase > 3) {
    endGameScreen = <Success/>
  } else if (props.strikes >= 3 || props.timeLeft === false) {
    endGameScreen = <Failure/>
  }

  return (
    <Entity id='driverCamera' position="0 2.5 2" >
      <DayDreamController />
      <Entity fence="width: 3; depth: 4; x0: 0; z0: 0"
        primitive="a-camera"
        fps-look-controls
        wasd-controls-enabled="true">
          <TransmissionIncoming />
          <RecordingIndicator />
          {endGameScreen || <Timer phase={props.phase}
                                moveSunCloser={props.moveSunCloser}
                                setTimeLeft={props.setTimeLeft}/>}
      </Entity>
    </Entity>
  )
}

export default DriverCam
