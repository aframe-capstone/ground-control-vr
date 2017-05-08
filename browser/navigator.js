import React from 'react'
import {connect} from 'react-redux'
import Manual from './SpaceShipManual.md.jsx'
import Clock from 'react-countdown-clock'

export default class Navigator extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    console.log('EY');
  }


  render(){
    return (
    <div>
      <Manual/>
      <Clock id='clock' seconds ={180} color={'#000'} alpha ={0.9} size={300} />
    </div>
    )
  }
}
