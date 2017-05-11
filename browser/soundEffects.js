import React from 'react'
import {Entity} from 'aframe-react'

// AMBIENT
const playSpaceshipAmbience = () => {
  console.log('playing spaceship ambience sound')
  return (<Entity id="ambientSound" >
    <Entity primitive='a-sound' src="#spaceshipAmbience" autoplay='true' loop='true' />
    {/* Optional machine humming sound: <Entity primitive='a-sound' src="#machineHumAmbience" autoplay='true' loop='true' /> */}
  </Entity>)
}

// SOUND EFFECTS
// TODO: these arent really for 'playing' the sound, but for instantiating the audio asset
const playSwitchOffSound = () => (<Entity primitive='a-sound' src="#switchOnSound" />)
const playSwitchOnSound = () => (<Entity primitive='a-sound' src="#switchOffSound" />)

export {playSpaceshipAmbience, playSwitchOnSound, playSwitchOffSound}
