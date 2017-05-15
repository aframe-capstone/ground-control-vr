import React from 'react'
import {Entity} from 'aframe-react'

const RecordingIndicator = (props) => {
  return (<Entity id='recordingIndicator'
    text={{value: 'RECORDING...', color: 'red'}}
    position={{
      x: 0.36,
      y: 0.05,
      z: -0.6
    }}
    visible='false'
    scale={{x: 1.2, y: 1.2, z: 1.2}}
  />)
}

export default RecordingIndicator
