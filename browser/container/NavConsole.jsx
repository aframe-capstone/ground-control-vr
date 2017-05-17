import React from 'react'
import { connect } from 'react-redux'
import NavConsole from '../navComponents/navConsole.jsx'
import {setUpRecording} from '../audio'
import {setSpaceBar} from '../reducers/strike-phase'

const mapStateToProps = state => ({
  phase: state.phase,
  strikes: state.strikes,
  driverStatus: state.driverStatus,
  navigatorStatus: state.navigatorStatus,
  setUpRecording: setUpRecording(state.navigatorStatus)
})



const mapDispatchToProps = dispatch => ({
  setSpaceBar:() => (dispatch(setSpaceBar()))
})


const NavConsoleContainer = connect(mapStateToProps, mapDispatchToProps)(NavConsole)

export default NavConsoleContainer
