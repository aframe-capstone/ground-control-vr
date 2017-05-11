import React from 'react'
import {Entity} from 'aframe-react'

const RecordingIndicator = (props) => {
  return (<Entity id='recordingIndicator'
    text={{value: 'RECORDING...'}}
    position={{
      x: 0.6,
      y: 0.35,
      z: -0.6
    }}
    visible='false'
    scale={{x: 1.5, y: 1.5, z: 1.5}}
  />)
}

export default RecordingIndicator
