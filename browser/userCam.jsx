import 'aframe'
import {Entity} from 'aframe-react'
import Tutorial from './tutorial'
import React from 'react'


const UserCam = (props) => {
  return (
    <Entity id='menuCamera' position='0 0 0'>
      <a-entity id="daydream" daydream-controller raycaster="objects: .selectable; recursive: true">
        <a-cone id='ray' color='cyan' position='0 0 -2' rotation='-90 0 0' radius-bottom='0.005' radius-top='0.001' height='4' />
        <a-box id='position-guide' visible='false' position='0 0 -2' />
      </a-entity>
      <Entity primitive="a-camera" wasd-controls-enabled="true">
        {
          props.isDesktop === true && (<Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>)
        }
        <Tutorial />
      </Entity>
    </Entity>
  )
}


export default UserCam
