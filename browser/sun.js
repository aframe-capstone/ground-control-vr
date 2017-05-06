import React from 'react'
import {Entity, Animation} from 'aframe-react'

const Sun = (<Entity primitive="a-sphere" radius="5" position={{x: 3, y: 2, z: 30}} radius="10" color="yellow" >
  <Entity id="sunRays" rotation="0 0 0">
    <Entity collada-model='#sunRaysOne'
      animation={{property: 'rotation',
        dur: '120000',
        easing: 'linear',
        fill: 'none',
        to: '360 0 0',
        repeat: 'indefinite'}} />
  </Entity>
  <Entity rotation="0 0 0">
    <Entity collada-model='#sunRaysTwo'
      animation={{property: 'rotation',
        dur: '120000',
        easing: 'linear',
        fill: 'none',
        to: '0 0 360',
        repeat: 'indefinite'}} />
    </Entity>
  <Entity primitive="a-light" type="directional" position={{x: 3, y: 2, z: -9}} color="yellow" intensity=".3" />
</Entity>)

export default Sun
