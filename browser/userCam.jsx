import 'aframe'
import {Entity} from 'aframe-react'
import Tutorial from './tutorial'
import React from 'react'
import DayDreamController from './components/dayDreamController'

const Cursor = (props) => (
  <Entity
    primitive="a-cursor"
    animation__click={{
      property: 'scale',
      startEvents: 'click',
      from: '0.1 0.1 0.1',
      to: '1 1 1',
      dur: 150}}
  />)

const UserCam = (props) => (
    <Entity id='menuCamera' position='0 0 0'>
      <DayDreamController />
      <Entity primitive="a-camera" wasd-controls-enabled="true">
        {props.isDesktop && <Cursor />}
      </Entity>
    </Entity>
  )

export default UserCam
