import React from 'react'

const DayDreamController = (props) => (
  <a-entity id="daydream" daydream-controller raycaster="objects: .selectable; recursive: true">
      <a-cone id='ray'
          color='cyan'
          position='0 0 -2'
          rotation='-90 0 0'
          radius-bottom='0.005'
          radius-top='0.001'
          height='4' />
      <a-box id='position-guide' visible='false' position='0 0 -2' />
  </a-entity>)

export default DayDreamController
