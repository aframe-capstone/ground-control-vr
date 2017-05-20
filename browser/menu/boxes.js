import React from 'react'
import {Entity} from 'aframe-react'

const Boxes = (props) => (
  <Entity>
    <Entity>
      <Entity id="boxOne"
        class='selectable'
        geometry={{primitive: 'box'}}
        material={{opacity: 0.6}}
        animation__scale={{
          property: 'scale',
          dir: 'alternate',
          dur: 1000,
          loop: true,
          to: '1.1 1.1 1.1'}}
        position={{x: 1, y: 1, z: -3}}
        events={{click: props.selectNavigator}}>
        <Entity text={{value: 'GROUND CONTROL!', align: 'center'}}
          scale={{x: 5, y: 5, z: 5}}
          position={{x: 0, y: 1, z: 0}}/>
        <Entity
          animation__scale={{
            property: 'scale',
            dir: 'alternate',
            dur: 1000,
            loop: true,
            to: '2 2 2'}}
          geometry={{
            primitive: 'box',
            depth: 0.2,
            height: 0.2,
            width: 0.2}}
          material={{color: '#24CAFF'}}/>
      </Entity>
      <Entity id="boxTwo"
        class='selectable'
        geometry={{primitive: 'box'}}
        material={{opacity: 0.6}}
        animation__scale={{property: 'scale',
          dir: 'alternate',
          dur: 1000,
          loop: true,
          to: '1.1 1.1 1.1'}}
        position={{x: -1, y: 1, z: -3}}
        events={{click: props.selectDriver}}>
        <Entity text={{value: 'PILOT!', align: 'center'}}
          scale={{x: 5, y: 5, z: 5}}
          position={{x: 0, y: 1, z: 0}} />
        <Entity animation__scale={{property: 'scale',
          dir: 'alternate',
          dur: 1000,
          loop: true,
          to: '2 2 2'}}
          geometry={{
            primitive: 'box',
            depth: 0.2,
            height: 0.2,
            width: 0.2}}
          material={{color: '#24CAFF'}} />
      </Entity>
    </Entity>
  </Entity>
  )

export default Boxes
