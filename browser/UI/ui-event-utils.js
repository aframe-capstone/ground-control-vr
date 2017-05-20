const setButtonPressedColor = (currentTarget) => {
  if (currentTarget.className === 'button selectable') {
    currentTarget.childNodes[1].setAttribute('material', {color: 'blue'})
  }
}

const resetButtonPressedColors = () => {
  const buttons = document.querySelectorAll('.button.selectable')
  buttons.forEach(button => button.childNodes[1].setAttribute('material', {color: 'red'}))
}

const resetClickHandlers = (handleClick) => {
  var buttons = [].slice.call(document.getElementsByClassName('button'))
  buttons.forEach((button) => {
    button.addEventListener('click', handleClick)
  })
}

export {setButtonPressedColor, resetButtonPressedColors, resetClickHandlers}
