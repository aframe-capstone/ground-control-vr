import React from 'react'
import {Entity} from 'aframe-react'
import FloatingUIPanel from './floatingUIPanel'

const Rotary = props => (
  <Entity class='selectable'
    key={`slider-${props.x}`}
    ui-rotary color={props.color}
    position={{x: props.x, y: 0.02, z: props.z}} >
    <Entity position={{x: 0, y: 0, z: 0}}
      geometry={{width: 'auto', height: 'auto'}} />
  </Entity>)

const Slider = props => (
  <Entity class='selectable'
    key={`slider-${props.x}`}
    ui-slider
    color={props.color}
    rotation={{x: 0, y: 90, z: 0}}
    position={{x: props.x, y: 0.02, z: props.z}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>)

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

  const FloatingUI = props => (
    <FloatingUIPanel panelId={props.panelId} isVisible={props.solvedPhase} />)

const Button = props => (
  <Entity class={`${props.className} selectable`}
    id={props.id}
    key={`button-${props.id}`}
    events={{click: props.handleClick}}
    ui-button={{color: props.color, baseColor: props.baseColor, pressedColor: props.pressedColor}}
    position={{x: props.x, y: 0.02, z: props.z}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>)

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

const generatePanel = (xDimension, zDimension, yRotation, panelNumber, handleFunction, panelId, handleSubmit, solvedPhase1) => {
  const ModuleName = props => (
    <Entity position={{x: 0.63, y: 0.05, z: -0.18}}
      rotation='-60 0 0'
      text={{font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt', value: props.name}}/>)

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
      <ModuleName name={moduleName} />
      { widgets }
    </Entity>)
  }

  // Returns a widget component by name 'switch', 'slider', 'knob', or button
  const getWidget = (widgetName, xVal, zVal, color) => {
    switch (widgetName) {
    case 'switch':
      return <Switch x={xVal} z={zVal} color={color} id={id++} handleChange={handleFunction} />
    case 'knob':
      return <Rotary x={xVal} z={zVal} color={color} />
    case 'slider':
      return <Slider x={xVal} z={zVal} color={color} />
    case 'button':
      return <Button x={xVal} z={zVal} color={color} id={id++} handleClick={handleFunction} className='button' />
    default:
      console.error('Hit default case in getWidget switch! Did you pass an invalid widget name?')
      break
    }
  }

  let id = 1
  let moduleId = 1

  if (panelId === 1) {
    const panel = []
    panel.push(generateModule(0, 0, 0, 'Gravitron Emitter', ['button', 'button', 'button']))
    panel.push(generateModule(-1, 0, 0, 'Nanomatronic Kilowasher', ['switch', 'switch', 'switch']))
    panel.push(<FloatingUI panelId={panelId} solvedPhase={solvedPhase1} />)
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
    panel.push(<FloatingUI panelId={panelId} solvedPhase={solvedPhase1} />)
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
    panel.push(<FloatingUI panelId={panelId} solvedPhase={solvedPhase1} />)
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
export {generatePanel, SubmitButton}
