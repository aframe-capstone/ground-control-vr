import React from 'react'
import {Entity} from 'aframe-react'

const Button = props => (
  <Entity class={`${props.className} selectable`}
    id={props.id}
    key={`button-${props.id}`}
    events={{click: props.handleClick}}
    ui-button={{color: props.color, baseColor: props.baseColor, pressedColor: props.pressedColor}}
    position={{x: props.x, y: 0.02, z: props.z}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>)

export default Button
