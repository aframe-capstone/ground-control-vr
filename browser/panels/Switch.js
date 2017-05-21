import React from 'react'
import {Entity} from 'aframe-react'

const Switch = props => (
  <Entity class={`switch selectable`}
    id={props.id}
    key={`switch-${props.id}`}
    events={{change: props.handleChange}}
    ui-toggle
    color={props.color}
    position={{x: props.x, y: 0.02, z: props.z}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>)

export default Switch
