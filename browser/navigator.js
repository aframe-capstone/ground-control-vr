import React from 'react'
import {connect} from 'react-redux'
import Manual from './SpaceShipManual.md.jsx'
import Clock from 'react-countdown-clock'

export default class Navigator extends React.Component{
  constructor(props){
    super(props)
  }


render(){
    return (
    <div id='background'>
        <link rel="stylesheet" type="text/css" href='aframe.css' />
      <Manual/>
    </div>
    )
  }

}
