const stopDefaultAndPropagation = (event) => {
  event.preventDefault()
  event.stopPropagation()
}

export default stopDefaultAndPropagation
