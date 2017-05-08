const PASSING = 'PASSING'
const FAILING = 'FAILING'

// #### INITIAL STATE #### //
const initialPhaseStrike  = {
  phase: 1,
  strike: 0
}

// #### REDUCER #### //

export default function (state = initialPhaseStrike, action) {
  const newState = Object.assign({}, state)

  switch(action.type) {
    case PASSING:
      newState.phase ++;
      return newState

    case FAILING:
      newState.strike ++;
      return newState

    default:
      return state
  }
}

