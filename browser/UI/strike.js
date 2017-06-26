import React from 'react'
import { Entity } from 'aframe-react'

export const getWarningLightOfColor = (strikes, timeLeft, success) => {
  if (success) {
    return (
      <Entity id="successLight"
        position={'0 5.3 0.4'}
        primitive="a-cone"
        geometry={{
          radiusBottom: 0.21,
          radiusTop: 0.33,
          height: 0.3 }}
        opacity="0.4"
        transparent>
      <Entity primitive="a-light"
        type="hemisphere"
        position="0, 0, 0"
        intensity='5'/>
    </Entity>)
  }
  if (!timeLeft) return
  switch (strikes) {
  case 2:
    return (
      <Entity>
        <RedWarningLight isVisible={true} />
        <OrangeWarningLight isVisible={false} />
        <WhiteWarningLight isVisible={false} />
        <RedSiren />
      </Entity>
    )
  case 1:
    return (
      <Entity>
        <RedWarningLight isVisible={false} />
        <OrangeWarningLight isVisible={true} />
        <OrangeSiren />
        <WhiteWarningLight isVisible={false} />
      </Entity>
    )
  case 0:
    return (
      <Entity>
        <RedWarningLight isVisible={false} />
        <OrangeWarningLight isVisible={false} />
        <WhiteWarningLight isVisible={true} />
      </Entity>
    )
  default:
    console.error('Inside default of strike')
    break
  }
}

const RedWarningLight = (props) => (
  <Entity visible={props.isVisible}
    id="warningLightRed"
    position={'0 5.3 0.4'}
    primitive="a-cone"
    geometry={{ radiusBottom: 0.21, radiusTop: 0.33, height: 0.3 }}
    opacity="0.4"
    transparent
    animation={{
      property: 'material.color',
      from: '#000',
      to: `#900`,
      ease: 'linear',
      loop: 'true',
      direction: 'ease-in' }}>
    <Entity visible={props.isVisible}
      primitive="a-light"
      type="hemisphere"
      position="0, 0, 0"
      intensity='5'
      animation={{
        property: 'color',
        from: '#000',
        to: `#900`,
        loop: 'true',
        ease: 'ease-in',
        direction: 'alternate' }} />
    <Entity primitive='a-sound'
      src="#alarm"
      loop="true"
      autoplay="true"
      position="0 0 0" />
  </Entity>)

const OrangeWarningLight = (props) => (
  <Entity visible={props.isVisible}
    id="warningLightOrange"
    position={'0 5.3 0.4'}
    primitive="a-cone"
    geometry={{
      radiusBottom: 0.21,
      radiusTop: 0.33,
      height: 0.3 }}
    opacity="0.4"
    transparent
    animation={{
      property: 'material.color',
      from: '#000',
      to: `#F50`,
      ease: 'linear',
      loop: 'true',
      direction: 'ease-in' }}>
    <Entity visible={props.isVisible}
      primitive="a-light"
      type="hemisphere"
      position="0, 0, 0"
      intensity='5'
      animation={{
        property: 'color',
        from: '#000',
        to: `#F50`,
        loop: 'true',
        ease: 'ease-in',
        direction: 'alternate' }} />
  </Entity>)

const WhiteWarningLight = (props) => (
  <Entity visible={props.isVisible}
    id="warningLightWhite"
    position={'0 5.3 0.4'}
    primitive="a-cone"
    geometry={{
      radiusBottom: 0.21,
      radiusTop: 0.33,
      height: 0.3 }}
    opacity="0.4"
    transparent
    animation={{
      property: 'material.color',
      from: '#000',
      to: `#FFF`,
      ease: 'linear',
      loop: 'true',
      direction: 'ease-in' }}>
    <Entity visible={props.isVisible}
      primitive="a-light"
      type="hemisphere"
      position="0, 0, 0"
      intensity='3'
      animation={{
        property: 'color',
        from: '#000',
        to: `#FFF`,
        loop: 'true',
        ease: 'ease-in',
        direction: 'alternate' }} />
  </Entity>)

const RedSiren = () => (
  <Entity primitive='a-sound'
    src="#redAlarm"
    loop="true"
    autoplay="true"
    position="0 0 0" />)

const OrangeSiren = () => (
  <Entity primitive='a-sound'
    src="#orangeAlarm"
    loop="true"
    autoplay="true"
    position="0 0 0" />)
