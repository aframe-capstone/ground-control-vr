import React from 'react'
import {Entity} from 'aframe-react'

{/* <Entity
    >
  {generatePanel(1, 1)}
</Entity> */}
{/* <Entity color="#213033"
  primitive="a-box"
  width="2.3"
  height="0.01"
  depth="0.6"
  rotation={{x: 60, y: -90, z: 0}}
  position={{x: 1.5, y: 3.5, z: 2.5}} >
  {generatePanel(1, 1)}
</Entity>
<Entity color="#213033"
  primitive="a-box"
  width="2.3"
  height="0.01"
  depth="0.6"
  rotation={{x: 60, y: 0, z: 0}}
  position={{x: 0, y: 3.5, z: 0}} >
  {generatePanel(1, 1)}
</Entity> */}

const generatePanel = (xDimension, zDimension, yRotation) => {
  const panel = []
  panel.push(generateModule(0, 0, 0))
  panel.push(generateModule(-1, 0, 0))
  panel.push(generateButton(0.9, 0, '#080'))
  return <Entity
    color="#213033"
    primitive="a-box"
    width="2.3"
    height="0.01"
    depth="0.6"
    rotation={{x: 60, y: yRotation, z: 0}}
    position={{x: xDimension, y: 3.5, z: zDimension}}
    id='MyPanel'
    > {panel} </Entity>
}

const generateModule = (initialXCoord, initialYCoord, initialZCoord) => {
  const module = []
  let iterator = 0
  let length = initialXCoord + 3
  for (var i = initialXCoord; i < length; i++) {
    module.push(generateLever(iterator, initialZCoord, 'red'))
    iterator+=0.3
  }
  return <Entity id='ModuleName' position={{x: initialXCoord, y: initialZCoord, z: initialZCoord}}>
    <Entity position={{x: 0.63, y: 0.05, z: -0.18}}
    rotation='-60 0 0'
    text={{font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt',
      value: 'Gravitron Emitter'}}
    />{ module }</Entity>
  // return module
}

const generateButton = (x, z, color) => {
  return <Entity ui-button color={color} position={{x: `${x}`, y: 0.02, z: `${z}`}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>
}

const generateLever = (x, z, color) => {
  return <Entity ui-toggle color={color} position={{x: `${x}`, y: 0.02, z: `${z}`}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>
}

/*
Scanner Unit System. Button Switch, Slider
Gravitron Emitter. Knob, Button, Button
Amp Scrambler. Knob, Slider, Switch
System Process Uploader. Slider. Button. Slider
Circuit Current Computer. Knobs
Sensor Anaylzer. Slider, Slider, Knob
*/

export {generatePanel}
