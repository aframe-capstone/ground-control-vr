import React from 'react'
import {Entity} from 'aframe-react'

export default () => (
  [loadModels(),
  loadTextures(),
  loadSoundAmbient(),
  loadSoundEffects(),
  loadFonts(),
  loadUIElements(),
  loadVideos()]
)

const loadFonts = () => {
  return (
    <Entity primitive="a-assets" key="fonts">
      <a-asset-item primitive="a-assets" key="fonts" id="moduleFont" src='assets/Virgo.json'/>
    </Entity>
  )
}

const loadModels = () => (
  <Entity primitive="a-assets" key="spaceShipAssets">
    <a-asset-item id="sunRaysOne" src="assets/sunrays/sun_rays1.dae" />
    <a-asset-item id="sunRaysTwo" src="assets/sunrays/sun_rays2.dae" />
    <a-asset-item id="viveObj" src="assets/vive/vive.obj" />
    <a-asset-item id="viveMtl" src="assets/vive/vive.mtl" />
    <a-asset-item timeout="10000" loaded = {function(){console.log('loadedXX');}} id="cockpit" src="assets/cockpit/cockpit-05_obj.obj" />
  </Entity>
)

const loadTextures = () => (
  <Entity key="textures">
    <img id="panelTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
    <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
    <a-asset-item events = { {loaded:function(){console.log('BUTT')}}} id="cockpitMaterial" src="assets/cockpit/cockpit-05_obj.mtl" />
  </Entity>
)

const loadUIElements = () => (
  <Entity primitive="a-assets" key="uiElements">
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
  </Entity>
)

const loadSoundEffects = () => (
  <Entity primitive="a-assets" key="soundEffects">
    <audio id="transmissionBeep" src="assets/sound/NASAtransmissionbeep.wav"/>
    <audio id="switchOnSound" src="assets/sound/switchOn.wav"/>
    <audio id="switchOffSound" src="assets/sound/switchOff.wav"/>
    <audio id="redAlarm" src="assets/sound/redAlarmLoop.wav"/>
    <audio id="orangeAlarm" src="assets/sound/alarmloop.wav"/>
    <audio id="startRecordingBeep" src="assets/sound/startRecordingBeep.wav"/>
  </Entity>
)

const loadSoundAmbient = () => (
  <Entity primitive="a-assets" key="backgroundSound">
    <audio id="spaceshipAmbience" src="assets/sound/spaceship-ambience.wav"/>
    <audio id="menuMusic" src="assets/sound/memory.wav"/>
    <audio id="machineHumAmbience" src="assets/sound/machine-ambience.wav"/>
  </Entity>
)

const loadVideos = () => (
  <Entity primitive="a-assets" key="videos">
    {/*<video id="sample-video" autoPlay="true" loop="false" src="assets/videos/small.mp4"></video>*/}
  </Entity>
)