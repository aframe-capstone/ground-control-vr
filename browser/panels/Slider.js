import React from 'react'
import {Entity} from 'aframe-react'

const Slider = props => (
  <Entity class='selectable'
    key={`slider-${props.x}`}
    ui-slider
    color={props.color}
    rotation={{x: 0, y: 90, z: 0}}
    position={{x: props.x, y: 0.02, z: props.z}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>)

export default Slider
