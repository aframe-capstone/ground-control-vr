import React from 'react'
import {Entity} from 'aframe-react'

const playSpaceshipAmbience = () => {
  return <Entity primitive='a-sound' src="#spaceshipAmbience" autoplay='true' loop='true' />
}

export {playSpaceshipAmbience}
