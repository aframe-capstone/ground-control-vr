import React from 'react'
import {Entity} from 'aframe-react'



const generatePanel = (xDimension, zDimension, yRotation, panelNumber, handleFunction, panelId, handleSubmit, solvedPhase1) => {
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
    return (<Entity id={moduleId++}
      position={{x: initialXCoord, y: initialZCoord, z: initialZCoord}}>
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
      return generateButton(xVal, zVal, color)
    default:
      console.error('Hit default case in getWidget switch! Did you pass an invalid widget name?')
      break
    }
  }

  const generateRotary = (x, z, color) => {
    return <Entity ui-rotary color={color} position={{x, y: 0.02, z: z}} >
      <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
    </Entity>
  }

  const generateSlider = (x, z, color) => {
    return <Entity  ui-slider color={color} rotation={{x: 0, y: 90, z: 0}} position={{x, y: 0.02, z}} >
      <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
    </Entity>
  }
  const generateButton = (x, z, color, isSubmit=handleFunction) => {
    return <Entity id={id++} class={"button"} events={{click:isSubmit}} ui-button color={color} position={{x, y: 0.02, z}} >
      <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
    </Entity>
  }

  const generateSwitch = (x, z, color) => {
    return <Entity id={id++} class={"switch"} events={{change: handleFunction}} ui-toggle color={color} position={{x, y: 0.02, z}} >
      <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
    </Entity>
  }

  const generateFloatingUI = (x, y, z) => {
    return (<a-entity visible={solvedPhase1} id={`panel-${panelId}-ui`} position="0 1.1 -0.97" rotation="-60 0 0" scale="0.3 0.3 0.3">
        <a-image mixin="image" src="#glow1" scale="5 5 5" position="0 0 -2">
          <a-animation attribute="visible" from="false" to="true" delay="1500" dur="1" fill="both"></a-animation>
        </a-image>
        <a-image mixin="image" src="#ring2" scale="1.75 1.75 1.75" position="0 0 -1.2">
          <a-animation attribute="visible" from="false" to="true" delay="1400" dur="1" fill="both"></a-animation>
        </a-image>
        <a-image mixin="image" src="#ring5" scale="1.2 1.2 1.2" position="0 -1.5 -2.1">
          <a-animation attribute="visible" from="false" to="true" delay="1550" dur="1" fill="both"></a-animation>
        </a-image>
        <a-image mixin="image" src="#schematic5" scale="2 2 2" position="2.5 0 -1.02" opacity="0.75">
          <a-animation attribute="visible" from="false" to="true" delay="1500" dur="1" fill="both"></a-animation>
        </a-image>
        <a-image mixin="image" src="#schematic4" scale="1.5 1.5 1.5" position="0 -3 -1.01" rotation="0 0 90" opacity="0.75">
          <a-animation attribute="visible" from="false" to="true" delay="1500" dur="1" fill="both"></a-animation>
        </a-image>
        <a-image mixin="image" src="#schematic3" scale="1 1 1" position="0 2.7 -1" opacity="0.75">
          <a-animation attribute="visible" from="false" to="true" delay="1450" dur="1" fill="both"></a-animation>
        </a-image>
        <a-image mixin="image" src="#schematic1" scale="2 2 2">
          <a-animation attribute="visible" from="false" to="true" delay="1400" dur="1" fill="both"></a-animation>
        </a-image>
        <a-image mixin="image" src="#text2" scale=".5 .5 .5" position="-1 3 .02">
          <a-animation attribute="visible" from="false" to="true" delay="1350" dur="1" fill="both"></a-animation>
        </a-image>
        <a-image mixin="image" src="#text4" position="-2 -2 .03">
          <a-animation attribute="visible" from="false" to="true" delay="1300" dur="1" fill="both"></a-animation>
        </a-image>
      </a-entity>)
  }
  let id = 1
  let moduleId = 1

  if(panelId === 1) {
    const panel = []
    panel.push(generateModule(0, 0, 0, 'Gravitron Emitter', ['button', 'button', 'button']))
    panel.push(generateModule(-1, 0, 0, 'Nanomatronic Kilowasher', ['switch', 'switch', 'switch']))
    panel.push(generateButton(0.9, 0, '#080', handleSubmit))
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
  } else if(panelId === 2) {
    const panel = []
    panel.push(generateModule(0, 0, 0, "Micro-Verse Battery", ['button', 'switch', 'button']))
    panel.push(generateModule(-1, 0, 0, 'Quantum Carburetor', ['switch', 'button', 'switch']))
    panel.push(generateButton(0.9, 0, '#080', handleSubmit))
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
  } else if(panelId === 3) {
    const panel = []
    panel.push(generateModule(0, 0, 0, 'C-137', ['switch', 'switch', 'button']))
    panel.push(generateModule(-1, 0, 0, 'Dark Matter Engine', ['button', 'switch', 'button']))
    panel.push(generateButton(0.9, 0, '#080', handleSubmit))
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
export {generatePanel}
