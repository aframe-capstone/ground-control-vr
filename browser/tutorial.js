import React from 'react'
import {Entity} from 'aframe-react'

const Tutorial = () => (
  <Entity
    position={{x: 0, y: -0.35, z: -0.6}}>
    <Entity
      position={{x: 0, y: 0.02, z: 0}}
      text={{
        font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt',
        value: 'Use headphones. Medium volume.',
        color: 'white'}}/>
    <Entity
      position={{x: 0, y: -0.1, z: 0}}
      text={{
        font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt',
        value: 'Hold space bar to talk to Ground Control',
        color: 'white'}}/>
  </Entity>)

export default Tutorial
