import React from 'react'
import {Entity} from 'aframe-react'

const navigatorCam = (<Entity position="0 20 0" rotation="-90 0 0" primitive="a-camera" look-controls-enabled="false" wasd-controls-enabled="false">
</Entity>)

const DriverCam = (<Entity id='driverCamera' position="0 2.25 1" >
  <Entity fence="width: 3; depth: 4; x0: 0; z0: 1"
    userHeight="0.6"
    primitive="a-camera"
    look-controls-enabled="true"
    wasd-controls-enabled="true">
    <Entity text={{value: 'INCOMING TRANSMISSION'}}
      // animation={{
      //   property: 'material.opacity',
      //   from: '0',
      //   to: '1.0',
      //   loop: 'true',
      //   ease: 'ease-in',
      //   direction: 'alternate'}}
      position={{x: 0.3, y: -0.45, z: -0.6}}/>
    <Entity text={{value: 'Time Till Impact: 3:00'}}
      // animation={{
      //   property: 'material.opacity',
      //   from: '0',
      //   to: '1.0',
      //   loop: 'true',
      //   ease: 'ease-in',
      //   direction: 'alternate'}}
      position={{x: 0.35, y: 0.45, z: -0.6}}/>
    {/* <Entity primitive='a-sound' src="#transmissionBeep" /> */}
  </Entity>
</Entity>)

export {DriverCam, navigatorCam}
