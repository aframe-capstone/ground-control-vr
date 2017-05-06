import React from 'react'
import {Entity} from 'aframe-react'

const generatePanel = (xDimension, zDimension) => {
  const panel = []
  panel.push(generateModule(0, 0, 0))
  panel.push(generateModule(-1, 0, 0))
  panel.push(generateButton(0.9, 0, '#080'))
  return <Entity id='MyPanel' > {panel} </Entity>
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
