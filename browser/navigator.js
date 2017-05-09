import React from 'react'
import {connect} from 'react-redux'
import Manual from './SpaceShipManual.md.jsx'

export default class Navigator extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
      return (
      <div>
        <Manual/>
      </div>
      )
  }
}
