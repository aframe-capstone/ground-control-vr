import React from 'react'
import {Entity} from 'aframe-react'
import FloatingUIPanel from './floatingUIPanel'

const generateSubmitButton = (x, y, z, color, className, handleSubmit, pressedColor) => (
  <Entity id='submit-button'
    key={`submit-button`}
    rotation={{x: -90, y: 0, z: 0}}
    class={`${className} selectable`}
    scale={{x: 1.2, y: 1.2, z: 1.2}}
    events={{click: handleSubmit}}
    ui-button={{color, pressedColor}}
    position={{x, y, z}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>)

const generatePanel = (xDimension, zDimension, yRotation, panelNumber, handleFunction, panelId, handleSubmit, solvedPhase1) => {
  const generateModuleName = (name) => (
    <Entity position={{x: 0.63, y: 0.05, z: -0.18}}
      rotation='-60 0 0'
      text={{font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt', value: name}}/>)

  const generateModule = (initialXCoord, initialYCoord, initialZCoord, moduleName, widgetNameSpecifiers) => {
    const widgets = []
    let iterator = 0
    const length = initialXCoord + 3
    for (var i = initialXCoord; i < length; i++) {
      widgets.push(getWidget(widgetNameSpecifiers.shift(), iterator, initialZCoord, 'red'))
      iterator+=0.3
    }
    return (<Entity id={moduleId++} key={`module${moduleId}`}
      position={{x: initialXCoord,
        y: initialZCoord,
        z: initialZCoord}}>
      {generateModuleName(moduleName)}
      { widgets }
    </Entity>)
  }

  // Returns a widget component by name 'switch', 'slider', 'knob', or button
  const getWidget = (widgetName, xVal, zVal, color, i) => {
    switch (widgetName) {
    case 'switch':
      return generateSwitch(xVal, zVal, color)
    case 'knob':
      return generateRotary(xVal, zVal, color)
    case 'slider':
      return generateSlider(xVal, zVal, color)
    case 'button':
      return generateButton(xVal, zVal, color, 'button')
    default:
      console.error('Hit default case in getWidget switch! Did you pass an invalid widget name?')
      break
    }
  }

  const generateRotary = (x, z, color) => (
    <Entity class='selectable'
      key={`slider-${x}`}
      ui-rotary color={color}
      position={{x, y: 0.02, z: z}} >
      <Entity position={{x: 0, y: 0, z: 0}}
        geometry={{width: 'auto', height: 'auto'}} />
    </Entity>)

  const generateSlider = (x, z, color) => (
    <Entity class='selectable'
      key={`slider-${x}`}
      ui-slider
      color={color}
      rotation={{x: 0, y: 90, z: 0}}
      position={{x, y: 0.02, z}} >
      <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
    </Entity>)

  const generateButton = (x, z, color, className, isSubmit=handleFunction, pressedColor='#009', baseColor) => (
    <Entity class={`${className} selectable`}
      id={id++}
      key={`button-${id}`}
      events={{click: isSubmit}}
      ui-button={{color, baseColor, pressedColor}}
      position={{x, y: 0.02, z}} >
      <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
    </Entity>)

  const generateSwitch = (x, z, color) => (
    <Entity class={`switch selectable`}
      id={id++}
      key={`switch-${id}`}
      events={{change: handleFunction}}
      ui-toggle
      color={color}
      position={{x, y: 0.02, z}} >
      <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
    </Entity>)

  const generateFloatingUI = (panelId) => (<FloatingUIPanel panelId={panelId} isVisible={solvedPhase1} />)

  let id = 1
  let moduleId = 1

  if (panelId === 1) {
    const panel = []
    panel.push(generateModule(0, 0, 0, 'Gravitron Emitter', ['button', 'button', 'button']))
    panel.push(generateModule(-1, 0, 0, 'Nanomatronic Kilowasher', ['switch', 'switch', 'switch']))
    panel.push(generateFloatingUI(panelId))
    return (<Entity
      id={panelId}
      color="#213033"
      primitive="a-box"
      width="2.3"
      height="0.01"
      depth="0.6"
      rotation={{x: 60, y: yRotation, z: 0}}
      position={{x: xDimension, y: 3.5, z: zDimension}}
      key={panelNumber}
      > {panel} </Entity>)
  } else if (panelId === 2) {
    const panel = []
    panel.push(generateModule(0, 0, 0, 'Micro-Verse Battery', ['button', 'switch', 'button']))
    panel.push(generateModule(-1, 0, 0, 'Quantum Carburetor', ['switch', 'button', 'switch']))
    panel.push(generateFloatingUI(panelId))
    return (<Entity
      id={panelId}
      color="#213033"
      primitive="a-box"
      width="2.3"
      height="0.01"
      depth="0.6"
      rotation={{x: 60, y: yRotation, z: 0}}
      position={{x: xDimension, y: 3.5, z: zDimension}}
      key={panelNumber}
      > {panel} </Entity>)
  } else if (panelId === 3) {
    const panel = []
    panel.push(generateModule(0, 0, 0, 'C-137', ['switch', 'switch', 'button']))
    panel.push(generateModule(-1, 0, 0, 'Dark Matter Engine', ['button', 'switch', 'button']))
    panel.push(generateFloatingUI(panelId))
    return (<Entity
      id={panelId}
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
}
export {generatePanel, generateSubmitButton}
