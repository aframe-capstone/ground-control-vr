const PASSING = 'PASSING'
const FAILING = 'FAILING'
const SET_STRIKE = 'SET_STRIKE'
const SET_PHASE = 'SET_PHASE'
// #### INITIAL STATE #### //
const initialPhaseStrike  = {
  phase: 1,
  strikes: 0
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
      
    default:
      return state
  }
  return newState
}
