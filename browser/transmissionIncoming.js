import React from 'react'
import {Entity} from 'aframe-react'

const TransmissionIncoming = (props) => {
  return (<Entity id='transmissionIncomingIndicator'
    text={{value: 'INCOMING TRANSMISSION'}}
    position={{
      x: 0.35,
      y: 0.35,
      z: -0.6
    }}
    visible='false'
    scale={{x: 1.5, y: 1.5, z: 1.5}}
  />)
}

export default TransmissionIncoming
