import React from 'react'
import { Entity } from 'aframe-react'

// const generateWarningLight = (hexCode, strikes) => {
//   console.log('HEX CODE: ', hexCode);

// }

export const getWarningLightOfColor = strikes => {
  console.log('GET WARNING LIGHT OF COLOR');
  console.log('STRIKES: ', strikes);
  console.log('TYPE OF STRIJES:', typeof strikes)
  switch (strikes) {
    case 2:
      return (
        <Entity>
          <Entity visible={true} id="warningLightRed" position={'0 5.3 0.4'} primitive="a-cone" geometry={{ radiusBottom: 0.21, radiusTop: 0.33, height: 0.3 }} opacity="0.4" transparent animation={{ property: 'material.color', from: '#000', to: `#900`, ease: 'linear', loop: 'true', direction: 'ease-in' }}>
            <Entity visible={true} primitive="a-light" type="hemisphere" position="0, 0, 0" intensity='5' animation={{ property: 'color', from: '#000', to: `#900`, loop: 'true', ease: 'ease-in', direction: 'alternate' }} />
            <Entity primitive='a-sound' src="#alarm" loop="true" autoplay="true" position="0 0 0" />
          </Entity>
          <Entity visible={false} id="warningLightOrange" position={'0 5.3 0.4'} primitive="a-cone" geometry={{ radiusBottom: 0.21, radiusTop: 0.33, height: 0.3 }} opacity="0.4" transparent animation={{ property: 'material.color', from: '#000', to: `#F50`, ease: 'linear', loop: 'true', direction: 'ease-in' }}>
            <Entity visible={false} primitive="a-light" type="hemisphere" position="0, 0, 0" intensity='5' animation={{ property: 'color', from: '#000', to: `#F50`, loop: 'true', ease: 'ease-in', direction: 'alternate' }} />
          </Entity>
          <Entity visible={false} id="warningLightWhite" position={'0 5.3 0.4'} primitive="a-cone" geometry={{ radiusBottom: 0.21, radiusTop: 0.33, height: 0.3 }} opacity="0.4" transparent animation={{ property: 'material.color', from: '#000', to: `#FFF`, ease: 'linear', loop: 'true', direction: 'ease-in' }}>
            <Entity visible={false} primitive="a-light" type="hemisphere" position="0, 0, 0" intensity='3' animation={{ property: 'color', from: '#000', to: `#FFF`, loop: 'true', ease: 'ease-in', direction: 'alternate' }} />
          </Entity>
        </Entity>
      )
    case 1:
      return (
        <Entity>
          <Entity visible={false} id="warningLightRed" position={'0 5.3 0.4'} primitive="a-cone" geometry={{ radiusBottom: 0.21, radiusTop: 0.33, height: 0.3 }} opacity="0.4" transparent animation={{ property: 'material.color', from: '#000', to: `#900`, ease: 'linear', loop: 'true', direction: 'ease-in' }}>
            <Entity visible={false} primitive="a-light" type="hemisphere" position="0, 0, 0" intensity='5' animation={{ property: 'color', from: '#000', to: `#900`, loop: 'true', ease: 'ease-in', direction: 'alternate' }} />
          </Entity>
          <Entity visible={true} id="warningLightOrange" position={'0 5.3 0.4'} primitive="a-cone" geometry={{ radiusBottom: 0.21, radiusTop: 0.33, height: 0.3 }} opacity="0.4" transparent animation={{ property: 'material.color', from: '#000', to: `#F50`, ease: 'linear', loop: 'true', direction: 'ease-in' }}>
            <Entity visible={true} primitive="a-light" type="hemisphere" position="0, 0, 0" intensity='5' animation={{ property: 'color', from: '#000', to: `#F50`, loop: 'true', ease: 'ease-in', direction: 'alternate' }} />
            <Entity primitive='a-sound' src="#alarm" loop="true" autoplay="true" position="0 0 0" />
          </Entity>
          <Entity visible={false} id="warningLightWhite" position={'0 5.3 0.4'} primitive="a-cone" geometry={{ radiusBottom: 0.21, radiusTop: 0.33, height: 0.3 }} opacity="0.4" transparent animation={{ property: 'material.color', from: '#000', to: `#FFF`, ease: 'linear', loop: 'true', direction: 'ease-in' }}>
            <Entity visible={false} primitive="a-light" type="hemisphere" position="0, 0, 0" intensity='3' animation={{ property: 'color', from: '#000', to: `#FFF`, loop: 'true', ease: 'ease-in', direction: 'alternate' }} />
          </Entity>
        </Entity>
      )
    case 0:
      return (
        <Entity>
          <Entity visible={false} id="warningLightRed" position={'0 5.3 0.4'} primitive="a-cone" geometry={{ radiusBottom: 0.21, radiusTop: 0.33, height: 0.3 }} opacity="0.4" transparent animation={{ property: 'material.color', from: '#000', to: `#900`, ease: 'linear', loop: 'true', direction: 'ease-in' }}>
            <Entity visible={false} primitive="a-light" type="hemisphere" position="0, 0, 0" intensity='5' animation={{ property: 'color', from: '#000', to: `#900`, loop: 'true', ease: 'ease-in', direction: 'alternate' }} />
          </Entity>
          <Entity visible={false} id="warningLightOrange" position={'0 5.3 0.4'} primitive="a-cone" geometry={{ radiusBottom: 0.21, radiusTop: 0.33, height: 0.3 }} opacity="0.4" transparent animation={{ property: 'material.color', from: '#000', to: `#F50`, ease: 'linear', loop: 'true', direction: 'ease-in' }}>
            <Entity visible={false} primitive="a-light" type="hemisphere" position="0, 0, 0" intensity='5' animation={{ property: 'color', from: '#000', to: `#F50`, loop: 'true', ease: 'ease-in', direction: 'alternate' }} />
          </Entity>
          <Entity visible={true} id="warningLightWhite" position={'0 5.3 0.4'} primitive="a-cone" geometry={{ radiusBottom: 0.21, radiusTop: 0.33, height: 0.3 }} opacity="0.4" transparent animation={{ property: 'material.color', from: '#000', to: `#FFF`, ease: 'linear', loop: 'true', direction: 'ease-in' }}>
            <Entity visible={true} primitive="a-light" type="hemisphere" position="0, 0, 0" intensity='3' animation={{ property: 'color', from: '#000', to: `#FFF`, loop: 'true', ease: 'ease-in', direction: 'alternate' }} />
          </Entity>
        </Entity>
      )
    default:
      // THIS IS THE WHEN YOU DIE
      console.log("YOU'RE IN THE DEFAULT");
      // return generateWarningLight('#900', strikes)
      break
  }
}
