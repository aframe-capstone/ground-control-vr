import React from 'react'
import {Entity} from 'aframe-react'
import Timer from './timer'
import TransmissionIncoming from './transmissionIncoming'
import RecordingIndicator from './recordingIndicator'
import Failure from './failure'
import Success from './success.jsx'
import './utils/fps-cursor'

const navigatorCam = (<Entity
  position="0 20 0"
  rotation="-90 0 0"
  primitive="a-camera"
  look-controls-enabled="false"
  wasd-controls-enabled="false">
</Entity>)

// REMOVED USER HEIGHT IN CAMERA HERE
const DriverCam = props => {

  let endGameScreen
  if(props.phase > 3) {
    endGameScreen = <Success/>
  } 
  else if(props.strikes >= 3 || props.timeLeft === false) {
    endGameScreen = <Failure/>
  }

  return (
    <Entity id='driverCamera' position="0 2.5 2" >
      <a-entity id="daydream" daydream-controller raycaster="objects: .selectable; recursive: true">
        <a-cone id='ray' color='cyan' position='0 0 -2' rotation='-90 0 0' radius-bottom='0.005' radius-top='0.001' height='4' />
        <a-box id='position-guide' visible='false' position='0 0 -2' />
      </a-entity>
    <Entity fence="width: 3; depth: 4; x0: 0; z0: 0"
      primitive="a-camera"
      fps-look-controls
      wasd-controls-enabled="true">
      {/* <Entity primitive="a-cursor"
        cursor="fuse: true; fuseTimeout: 1000"
        animation__click={{
          property: 'scale',
          startEvents: 'click',
          from: '0.1 0.1 0.1',
          to: '1 1 1',
          dur: 150}}/> */}
        <TransmissionIncoming />
        <RecordingIndicator />
        {endGameScreen ? endGameScreen : <Timer phase={props.phase} increaseSunSize={props.increaseSunSize} setTimeLeft={props.setTimeLeft}/>}
    </Entity>
    </Entity>
  )
}
export {DriverCam, navigatorCam}
