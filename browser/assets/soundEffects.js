import React from 'react'
import {Entity} from 'aframe-react'

// AMBIENT
const SpaceshipAmbience = (props) => (<Entity id="ambientSound" >
    <Entity primitive='a-sound' src="#spaceshipAmbience" autoplay='true' loop='true' />
  </Entity>)

/* Optional machine humming sound: <Entity primitive='a-sound' src="#machineHumAmbience" autoplay='true' loop='true' /> */

export {SpaceshipAmbience}
