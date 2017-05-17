import React from 'react'
import {Entity, Animation} from 'aframe-react'

class Sun extends React.Component {
  render() {
    const rayRatio = 4
    return (<Entity id="Sun"
      primitive="a-sphere"
      material={{
        opacity: '0.95',
        transparent: 'true',
        shader: 'flat'}}
      radius={40}
      position={{x: 1, y: 4, z: this.props.distance}}
      color="yellow" >
      <Entity id="sunRays" rotation="0 0 0">
        <Entity collada-model='#sunRaysOne'
          scale={{x: rayRatio, y: rayRatio, z: rayRatio}}
          animation={{
            property: 'rotation',
            dur: '120000',
            loop: 'true',
            easing: 'linear',
            fill: 'none',
            to: '360 0 0',
            repeat: 'indefinite'}} />
        </Entity>
      <Entity rotation="0 0 0">
        <Entity collada-model='#sunRaysTwo'
          scale={{x: rayRatio, y: rayRatio, z: rayRatio}}
          animation={{
            property: 'rotation',
            dur: '120000',
            loop: 'true',
            easing: 'linear',
            fill: 'none',
            to: '0 0 360',
            repeat: 'indefinite'}} />
      </Entity>
      <Entity primitive="a-light"
        type="directional"
        position={{x: 3, y: 2, z: -9}}
        color="yellow"
        intensity="0.3"
      />
    </Entity>)
  }
}

export default Sun
