import React from 'react'
import {Entity} from 'aframe-react'

const TransmissionIncoming = (props) => (<Entity id='transmissionIncomingIndicator'
    text={{value: 'INCOMING TRANSMISSION'}}
    position={{
      x: 0.3,
      y: 0.05,
      z: -0.6
    }}
    visible='false'
    scale={{x: 1.1, y: 1.1, z: 1.1}}
  />)

export default TransmissionIncoming
