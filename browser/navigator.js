import React from 'react'
import {connect} from 'react-redux'
//import Clock from 'react-countdown-clock'
import NavConsole from './container/NavConsole.jsx'

export default class Navigator extends React.Component{
  constructor(props){
    super(props)
  }


render(){
    return (
    <div>
      <NavConsole/>
    </div>
    )
  }

}
