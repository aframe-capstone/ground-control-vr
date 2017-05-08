import React from 'react'
import {Entity} from 'aframe-react'

const playSpaceshipAmbience = () => {
  return <Entity primitive='a-sound' src="#spaceshipAmbience" autoplay='true' loop='true' />
}

const playSwitchOffSound = () => {
  return <Entity primitive='a-sound' src="#switchOnSound" autoplay='true' loop='true' />
}

const playSwitchOnSound = () => {
  return <Entity primitive='a-sound' src="#switchOffSound" autoplay='true' loop='true' />
}

export {playSpaceshipAmbience, playSwitchOnSound, playSwitchOffSound}
