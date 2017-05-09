import React from 'react'
import { connect } from 'react-redux'
import simulation from '../simulation'
import {addStrike, addPhase} from '../reducers/strike-phase'

const mapStateToProps = state => ({
  phase: state.phase,
  strikes: state.strikes
})


const mapDispatchToProps = dispatch => ({
  addStrike: () => (dispatch(addStrike())),
  addPhase: () => (dispatch(addPhase()))
})


const SimulationContainer = connect(mapStateToProps, mapDispatchToProps)(simulation)

export default SimulationContainer
