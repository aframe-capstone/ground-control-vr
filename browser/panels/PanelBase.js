import React from 'react'
import {Entity} from 'aframe-react'

const PanelBase = props => (
  <Entity
    id={props.panelId}
    color="#213033"
    primitive="a-box"
    width="2.3"
    height="0.01"
    depth="0.6"
    rotation={{x: 60, y: props.yRotation, z: 0}}
    position={{x: props.xDimension, y: 3.5, z: props.zDimension}}
    key={props.panelNumber}
    > {props.panelWidgets} </Entity>
)

export default PanelBase
