import React from 'react'
import { connect } from 'react-redux'
import testingSpaceManual from '../testingSpaceManual.jsx'

const mapStateToProps = state => ({
  phase: state.phase,
  strikes: state.strikes
})


const mapDispatchToProps = dispatch => ({
})


const TestingSpaceManualContainer = connect(mapStateToProps, mapDispatchToProps)(testingSpaceManual)

export default TestingSpaceManualContainer
