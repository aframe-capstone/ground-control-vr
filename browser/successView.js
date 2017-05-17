import React from 'react'
import {connect} from 'react-redux'

const mapStatetoProps = (state) => ({ phases: state.phases })

const Success = (props) => (
  props.phases === 4
  ? <div>
    Here would go a breakdown of all your stats and your performance metrics, e.g. your 'cooperativeness rating'
  </div>
  : null)

const SuccessView = connect(mapStatetoProps)(Success)
export default SuccessView
