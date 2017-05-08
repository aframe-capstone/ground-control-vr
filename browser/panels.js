import React from 'react'
import {Entity} from 'aframe-react'

const generatePanel = (xDimension, zDimension, yRotation, panelNumber) => {
  const panel = []
  panel.push(generateModule(0, 0, 0, 'Gravitron Emitter', ['button', 'switch', 'slider']))
  panel.push(generateModule(-1, 0, 0, 'Nanomatronic Kilowasher', ['knob', 'button', 'button']))
  panel.push(generateButton(0.9, 0, '#080'))
  return (<Entity
    color="#213033"
    primitive="a-box"
    width="2.3"
    height="0.01"
    depth="0.6"
    rotation={{x: 60, y: yRotation, z: 0}}
    position={{x: xDimension, y: 3.5, z: zDimension}}
    key={panelNumber}
    > {panel} </Entity>)
}

const generateModuleName = (name) => {
  return <Entity position={{x: 0.63, y: 0.05, z: -0.18}} rotation='-60 0 0' text={{font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt', value: name}}/>
}

const generateModule = (initialXCoord, initialYCoord, initialZCoord, moduleName, widgetNameSpecifiers) => {
  const widgets = []
  let iterator = 0
  let length = initialXCoord + 3
  for (var i = initialXCoord; i < length; i++) {
    widgets.push(getWidget(widgetNameSpecifiers.shift(), iterator, initialZCoord, 'red'))
    iterator+=0.3
  }
  return (<Entity id={moduleName}
    position={{x: initialXCoord, y: initialZCoord, z: initialZCoord}}>
    {generateModuleName(moduleName)}
    { widgets }
  </Entity>)
}

// Returns a widget component by name 'switch', 'slider', 'knob', or button
const getWidget = (widgetName, xVal, zVal, color) => {
  switch (widgetName) {
  case 'switch':
    return generateSwitch(xVal, zVal, color)
  case 'knob':
    return generateRotary(xVal, zVal, color)
  case 'slider':
    return generateSlider(xVal, zVal, color)
  case 'button':
    return generateButton(xVal, zVal, color)
  default:
    console.error('Hit default case in getWidget switch! Did you pass an invalid widget name?')
    break
  }
}

const generateRotary = (x, z, color) => {
  return <Entity ui-rotary color={color} position={{x: `${x}`, y: 0.02, z: `${z}`}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>
}

const generateSlider = (x, z, color) => {
  return <Entity ui-slider color={color} rotation={{x: 0, y: 90, z: 0}} position={{x: `${x}`, y: 0.02, z: `${z}`}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>
}

const generateButton = (x, z, color) => {
  return <Entity ui-button color={color} position={{x, y: 0.02, z}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>
}

const generateSwitch = (x, z, color) => {
  return <Entity ui-toggle color={color} position={{x: `${x}`, y: 0.02, z: `${z}`}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>
}

export {generatePanel}
