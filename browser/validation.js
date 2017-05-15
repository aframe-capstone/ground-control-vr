const BUTTON_SOLUTION = 'button selectable'
const SWITCH_SOLUTION = 'switch selectable'

export const solution1 = {
  1: {
    currentState: [{buttonId: '1', typeOfwidget: BUTTON_SOLUTION}, {buttonId: '2', typeOfwidget: BUTTON_SOLUTION}, {buttonId: '3', typeOfwidget: BUTTON_SOLUTION}]
  },
  2: {
    currentState: [{buttonId: '4', typeOfwidget: SWITCH_SOLUTION}, {buttonId: '5', typeOfwidget: SWITCH_SOLUTION}, {buttonId: '6', typeOfwidget: SWITCH_SOLUTION}]
  }
}

export const solution2 = {
  1: {
    currentState:[{buttonId: '3', typeOfwidget: BUTTON_SOLUTION}, {buttonId: '2', typeOfwidget: SWITCH_SOLUTION},{buttonId: '1', typeOfwidget: BUTTON_SOLUTION}]
  },
  2: {
    currentState:[{buttonId: '4', typeOfwidget: SWITCH_SOLUTION},{buttonId: '5', typeOfwidget: BUTTON_SOLUTION},{buttonId: '6', typeOfwidget: SWITCH_SOLUTION}]
  }
}

export const solution3 = {
  1: {
    currentState:[{buttonId:'1', typeOfwidget: SWITCH_SOLUTION}, {buttonId:'2', typeOfwidget: SWITCH_SOLUTION}, {buttonId:'3', typeOfwidget: BUTTON_SOLUTION}]
  },
  2: {
    currentState:[{buttonId:'6', typeOfwidget: BUTTON_SOLUTION}, {buttonId:'5', typeOfwidget: SWITCH_SOLUTION}, {buttonId:'4', typeOfwidget: BUTTON_SOLUTION}]
  }
}
