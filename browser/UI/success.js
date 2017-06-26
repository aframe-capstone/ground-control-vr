import React from 'react'
import {Entity} from 'aframe-react'

const Success = () => (
  <Entity position={{x: 0.42, y: 0.02, z: -0.3}}
    text={{
      font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt',
      value: 'SUCCESS',
      color: 'green'}}/>)

export default Success
