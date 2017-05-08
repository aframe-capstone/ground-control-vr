import React from 'react'
import {Entity} from 'aframe-react'

export default () => (<a-assets>
  {loadModels()}
  {loadTextures()}
  {loadSoundAmbient()}
  {loadSoundEffects()}
  {loadFonts()}
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

const loadSoundEffects = () => (<a-assets>
  <audio id="alarm" src="assets/sound/alarmloop.mp3"/>
  <audio id="transmissionBeep" src="assets/sound/NASAtransmissionbeep.mp3"/>
  <audio id="switchOnSound" src="assets/sound/switchOn.mp3"/>
  <audio id="switchOffSound" src="assets/sound/switchOff.mp3"/>
</a-assets>)

const loadSoundAmbient = () => (<a-assets>
  <audio id="spaceshipAmbience" src="assets/sound/spaceship-ambience.mp3"/>
</a-assets>)
