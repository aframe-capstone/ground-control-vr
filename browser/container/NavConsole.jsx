import React from 'react'
import { connect } from 'react-redux'
import NavConsole from '../navComponents/navConsole.jsx'

const mapStateToProps = state => ({
  phase: state.phase,
  strikes: state.strikes,
  driverStatus: state.driverStatus,
  navigatorStatus: state.navigatorStatus,
})


const mapDispatchToProps = dispatch => ({
})


const NavConsoleContainer = connect(mapStateToProps, mapDispatchToProps)(NavConsole)

export default NavConsoleContainer
