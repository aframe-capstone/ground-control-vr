import 'aframe'
import {Entity} from 'aframe-react'
import Tutorial from '../tutorial/tutorial'
import React from 'react'
import DayDreamController from '../vr/dayDreamController'
import Cursor from '../UI/cursor'

const UserCam = (props) => (
    <Entity id='menuCamera' position='0 0 0'>
      <DayDreamController />
      <Entity primitive="a-camera" wasd-controls-enabled="true">
        {props.isDesktop && <Cursor />}
      </Entity>
    </Entity>
  )

export default UserCam
