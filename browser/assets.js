import React from 'react'
import {Entity} from 'aframe-react'

export default () => (<a-assets>
  {loadModels()}
  {loadTextures()}
  {loadSoundAmbient()}
  {loadSoundEffects()}
  {loadFonts()}
  {loadUIElements()}
{/* <a-asset-item id="moduleFont" src='https://cdn.aframe.io/fonts/Exo2Bold.fnt' /> */}
</a-assets>)

const loadFonts = () => {
  // fonts go here
}

const loadModels = () => (<a-assets>
  <a-asset-item id="sunRaysOne" src="assets/sunrays/sun_rays1.dae" />
  <a-asset-item id="sunRaysTwo" src="assets/sunrays/sun_rays2.dae" />
  <a-asset-item id="cockpit" src="assets/cockpit/cockpit-05_obj.obj" />
</a-assets>)

const loadTextures = () => (<a-assets>
  <img id="panelTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
  <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
  <a-asset-item id="cockpitMaterial" src="assets/cockpit/cockpit-05_obj.mtl" />
</a-assets>)

const loadUIElements = () => (<a-assets>
    <a-mixin id="image" geometry="height: 2; width: 2"></a-mixin>
    <img id="glow1" src="assets/panels/glow1.png" />
    <img id="ring1" src="assets/panels/ring1.png" />
    <img id="ring2" src="assets/panels/ring2.png" />
    <img id="ring3" src="assets/panels/ring3.png" />
    <img id="ring4" src="assets/panels/ring4.png" />
    <img id="ring5" src="assets/panels/ring5.png" />
    <img id="schematic1" src="assets/panels/schematic1.png" />
    <img id="schematic2" src="assets/panels/schematic2.png" />
    <img id="schematic3" src="assets/panels/schematic3.png" />
    <img id="schematic4" src="assets/panels/schematic4.png" />
    <img id="schematic5" src="assets/panels/schematic5.png" />
    <img id="text1" src="assets/panels/text1.png" />
    <img id="text2" src="assets/panels/text2.png" />
    <img id="text3" src="assets/panels/text3.png" />
    <img id="text4" src="assets/panels/text4.png" />
  </a-assets>)

const loadSoundEffects = () => (<a-assets>
  <audio id="alarm" src="assets/sound/alarmloop.mp3"/>
  <audio id="transmissionBeep" src="assets/sound/NASAtransmissionbeep.mp3"/>
  <audio id="switchOnSound" src="assets/sound/switchOn.mp3"/>
  <audio id="switchOffSound" src="assets/sound/switchOff.mp3"/>
</a-assets>)

const loadSoundAmbient = () => (<a-assets>
  <audio id="spaceshipAmbience" src="assets/sound/spaceship-ambience.mp3"/>
  <audio id="machineHumAmbience" src="assets/sound/machine-ambience.mp3"/>
</a-assets>)
