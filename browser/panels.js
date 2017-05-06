import React from 'react'
import {Entity} from 'aframe-react'

const generatePanel = (xDimension, zDimension) => {
  const panel = []
  for (let tempX = 0; tempX <= xDimension; tempX+=1) {
    for (let tempZ = 0; tempZ <= zDimension; tempZ+=1) {
      console.log('calling generatePanel')
      panel.push(generateModule(-1, 0, 0))
      panel.push(generateModule(0, 0, 0))
    }
  }
  return <Entity id='MyPanel' > {panel} </Entity>
}

const generateModule = (initialXCoord, initialYCoord, initialZCoord) => {
  const module = []
  let length = initialXCoord + 3
  for (var i = initialXCoord; i < length; i++) {
    initialXCoord+=0.3
    module.push(generateLever(initialXCoord, initialZCoord, 'red'))
  }
  module.push(<Entity geometry={{primitive: 'plane', width: '1', height: 'auto'}} id='ModuleName' rotation='-60 0 0' text={{font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt', value: 'Flux Capacitor'}} />)
  return module
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

export {generatePanel}
