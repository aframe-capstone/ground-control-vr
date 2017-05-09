const PASSING = 'PASSING'
const FAILING = 'FAILING'

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


// #### REDUCER #### //

export default function (state = initialPhaseStrike, action) {
  const newState = Object.assign({}, state)

  switch(action.type) {
    case PASSING:
      newState.phase ++;
      return newState

    case FAILING:
      newState.strikes ++;
      return newState

    default:
      return state
  }
}
