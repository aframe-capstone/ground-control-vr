import React from 'react'
import {connect} from 'react-redux'
import NavConsole from '../container/NavConsole.jsx'
import {setUpRecording} from '../audio'

export default class Navigator extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    setUpRecording(this.props.isNavigator)
  }

  render(){
    return (
    <div>
      <NavConsole spaceBarDown={this.props.spaceBarDown}/>
    </div>
    )
  }

}
