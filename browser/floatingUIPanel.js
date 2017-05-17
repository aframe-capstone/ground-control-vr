import React from 'react'
import {Entity} from 'aframe-react'

const FloatingUIPanel = (props) => (<Entity key={`panel-${props.panelId}-ui`} visible={props.isVisible} id={`panel-${props.panelId}-ui`} position="0 1.1 -0.97" rotation="-60 0 0" scale="0.3 0.3 0.3">
      <a-image mixin="image" src="#glow1" scale="5 5 5" position="0 0 -2">
        <a-animation attribute="visible" from="false" to="true" delay="1500" dur="1" fill="both"></a-animation>
      </a-image>
      <a-image mixin="image" src="#ring2" scale="1.75 1.75 1.75" position="0 0 -1.2">
        <a-animation attribute="visible" from="false" to="true" delay="1400" dur="1" fill="both"></a-animation>
      </a-image>
      <a-image mixin="image" src="#ring5" scale="1.2 1.2 1.2" position="0 -1.5 -2.1">
        <a-animation attribute="visible" from="false" to="true" delay="1550" dur="1" fill="both"></a-animation>
      </a-image>
      <a-image mixin="image" src="#schematic5" scale="2 2 2" position="2.5 0 -1.02" opacity="0.75">
        <a-animation attribute="visible" from="false" to="true" delay="1500" dur="1" fill="both"></a-animation>
      </a-image>
      <a-image mixin="image" src="#schematic4" scale="1.5 1.5 1.5" position="0 -3 -1.01" rotation="0 0 90" opacity="0.75">
        <a-animation attribute="visible" from="false" to="true" delay="1500" dur="1" fill="both"></a-animation>
      </a-image>
      <a-image mixin="image" src="#schematic3" scale="1 1 1" position="0 2.7 -1" opacity="0.75">
        <a-animation attribute="visible" from="false" to="true" delay="1450" dur="1" fill="both"></a-animation>
      </a-image>
      <a-image mixin="image" src="#schematic1" scale="2 2 2">
        <a-animation attribute="visible" from="false" to="true" delay="1400" dur="1" fill="both"></a-animation>
      </a-image>
      <a-image mixin="image" src="#text2" scale=".5 .5 .5" position="-1 3 .02">
        <a-animation attribute="visible" from="false" to="true" delay="1350" dur="1" fill="both"></a-animation>
      </a-image>
      <a-image mixin="image" src="#text4" position="-2 -2 .03">
        <a-animation attribute="visible" from="false" to="true" delay="1300" dur="1" fill="both"></a-animation>
      </a-image>
    </Entity>)

export default FloatingUIPanel
