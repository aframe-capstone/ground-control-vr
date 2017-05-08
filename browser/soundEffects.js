import React from 'react'
import {Entity} from 'aframe-react'

const playSpaceshipAmbience = () => {
  return <Entity primitive='a-sound' src="#spaceshipAmbience" autoplay='true' loop='true' />
}

const playSwitchOffSound = () => {
  return <Entity primitive='a-sound' src="#switchOnSound" />
}

const playSwitchOnSound = () => {
  return <Entity primitive='a-sound' src="#switchOffSound" />
}

export {playSpaceshipAmbience, playSwitchOnSound, playSwitchOffSound}
