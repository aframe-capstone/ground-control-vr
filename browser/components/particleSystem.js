import React from 'react'
import 'aframe-react'

const ParticleSystem = props => (<Entity rotation='-90 0 0' particle-system={{preset: 'snow', particleCount: 4000}}/>)

export default ParticleSystem
