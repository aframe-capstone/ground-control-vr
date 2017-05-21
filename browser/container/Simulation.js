import React from 'react'
import { connect } from 'react-redux'
import Simulation from '../simulation'
import {addStrike, addPhase} from '../reducers/strike-phase'

const mapStateToProps = state => ({
  phase: state.phase,
  strikes: state.strikes,
  driverStatus: state.driverStatus,
  navigatorStatus: state.navigatorStatus,
})

const mapDispatchToProps = dispatch => ({
  addStrike: () => (dispatch(addStrike())),
  addPhase: () => (dispatch(addPhase()))
})

const SimulationContainer = connect(mapStateToProps, mapDispatchToProps)(Simulation)

export default SimulationContainer
