import React from 'react'
import {connect} from 'react-redux'

const mapStatetoProps = (state) => ({ strikes: state.strikes })

const Failure = (props) => (props.strikes === 3
  ? <div><img style={{height: '750px', width: 'auto'}} src='/assets/explodingShip.gif'/></div>
  : null)

const FailureView = connect(mapStatetoProps)(Failure)
export default FailureView
