import React from 'react'
import {Entity} from 'aframe-react'

const navigatorCam = (<Entity position="0 20 0" rotation="-90 0 0" primitive="a-camera" look-controls-enabled="false" wasd-controls-enabled="false">
</Entity>)

const DriverCam = (<Entity position="0 2.25 1" >
  <Entity fence="width: 3; depth: 4; x0: 0; z0: 1" userHeight="0.6" primitive="a-camera" look-controls-enabled="true" wasd-controls-enabled="true" />
  {/* <Entity primitive="a-light" type="spot" intensity="0.1" position="2 1 4"/> */}
</Entity>)

export {DriverCam, navigatorCam}
