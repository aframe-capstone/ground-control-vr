const PASSING = 'PASSING'
const FAILING = 'FAILING'
const SET_STRIKE = 'SET_STRIKE'
const SET_PHASE = 'SET_PHASE'
const SET_NAVIGATOR_STATUS = 'SET_NAVIGATOR_STATUS'
const SET_DRIVER_STATUS = 'SET_DRIVER_STATUS'

// #### INITIAL STATE #### //
const initialPhaseStrike  = {
  phase: 1,
  strikes: 0,
  navigatorStatus: false,
  driverStatus: false,
}

// #### ACTION CREATORS #### //

export const addStrike = () => ({
  type: FAILING
})

export const addPhase = () => ({
  type: PASSING
})

export const setStrike = strikes => ({
  type: SET_STRIKE,
  strikes
})

export const setPhase = phase => ({
  type: SET_PHASE,
  phase
})

export const setNavigatorStatus = navigatorStatus => ({
  type: SET_NAVIGATOR_STATUS,
  navigatorStatus
})

export const setDriverStatus = driverStatus => ({
  type: SET_DRIVER_STATUS,
  driverStatus
})


// #### REDUCER #### //

export default function (state = initialPhaseStrike, action) {
  const newState = Object.assign({}, state)

  switch(action.type) {
    case PASSING:
      newState.phase ++;
      break;

    case FAILING:
      newState.strikes ++;
      break;

    case SET_PHASE:
      newState.phase = action.phase
      break;

    case SET_STRIKE:
      newState.strikes = action.strikes
      break;

    case SET_NAVIGATOR_STATUS:
      newState.navigatorStatus = action.navigatorStatus
      break;

    case SET_DRIVER_STATUS:
      newState.driverStatus = action.driverStatus
      break;

    default:
      return state
  }
  return newState
}
