import React from 'react'
import {Entity} from 'aframe-react'

const TransmissionIncoming = (props) => {
  return (<Entity id='transmissionIncomingIndicator'
    text={{value: 'INCOMING TRANSMISSION'}}
    position={{
      x: 0.3,
      y: -0.45,
      z: -0.6
    }}
    visible='false'
  />)
}

export default TransmissionIncoming
