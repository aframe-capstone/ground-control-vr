import React from 'react'
import {Entity} from 'aframe-react'

const SubmitButton = props => (
  <Entity id='submit-button'
    key={`submit-button`}
    rotation={{x: -90, y: 0, z: 0}}
    class={`${props.className} selectable`}
    scale={{x: 1.2, y: 1.2, z: 1.2}}
    events={{click: props.handleSubmit}}
    ui-button={{color: props.color, pressedColor: props.pressedColor}}
    position={{x: props.x, y: props.y, z: props.z}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>)

export default SubmitButton
