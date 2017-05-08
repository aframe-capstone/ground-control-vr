import React from 'react'
import {Entity} from 'aframe-react'
import countdown from './countdown'

const navigatorCam = (<Entity
  position="0 20 0"
  rotation="-90 0 0"
  primitive="a-camera"
  look-controls-enabled="false"
  wasd-controls-enabled="false">
</Entity>)

const DriverCam = (props) => {
  return (<Entity id='driverCamera' position="0 2.25 1" >
      <Entity fence="width: 3; depth: 4; x0: 0; z0: 1"
        userHeight="0.6"
        primitive="a-camera"
        look-controls-enabled="true"
        wasd-controls-enabled="true">
        <Entity primitive="a-cursor"
          events={{}}
          position={{x: 0, y: 0, z: -0.2}}
          scale='0.1 0.1 0.1'
          animation__click={{
            property: 'scale',
            startEvents: 'click',
            from: '0.1 0.1 0.1',
            to: '0.3 0.3 0.3',
            dur: 150
          }}/>
          <Entity text={{value: 'INCOMING TRANSMISSION'}}
            position={{
              x: 0.3,
              y: -0.45,
              z: -0.6
            }}/>
            <Entity position={{
              x: 0.35,
              y: 0.45,
              z: -0.6
            }}
            text={{value: `Time To Impact: ${props.timeRemaining}`}}
            >
            </Entity>
          </Entity>
        </Entity>)
}

export {DriverCam, navigatorCam}
