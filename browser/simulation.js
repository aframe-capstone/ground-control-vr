import 'aframe'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'babel-polyfill'
import {Entity, Scene, Animation} from 'aframe-react'
import React from 'react'
import ReactDOM from 'react-dom'
import Peer from 'simple-peer'
import 'aframe-ui-widgets'
import 'aframe-fence-component'
import 'aframe-cubemap-component'
import Sun from './sun'
import {DriverCam} from './cameras'
import _ from 'lodash'
import {solution1, solution2, solution3} from './validation'
import {playSpaceshipAmbience, playSwitchOnSound, playSwitchOffSound} from './soundEffects'
import Failure from './failure'

/* Call generatePanel with x coordinate, z coordinate, and y rotation */
import {generatePanel, generateSubmitButton} from './panels'

/* Call getWarningLightOfColor with a string ('white', 'orange', or 'red')
to generate a warning light with proper hex value and animation */
import {getWarningLightOfColor} from './strike'

const resetClickHandlers = (handleClick) => {
  var buttons = [].slice.call(document.getElementsByClassName('button'))
  buttons.forEach((button) => {
    button.addEventListener('click', handleClick)
  })
}

export default class Simulation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      radius: 0,
      renderCockpit: true,
      cockpit: [],
      strikes: this.props.strikes,
      currentPhase: this.props.phase,
      1: {
        1: {
          currentState: []
        },
        2: {
          currentState: []
        }
      },
      2: {
        1: {
          currentState: []
        },
        2: {
          currentState: []
        }
      },
      3: {
        1: {
          currentState: []
        },
        2: {
          currentState: []
        }
      },
      timeRemaining: 0
    }
    this.increaseSunSize = this.increaseSunSize.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  increaseSunSize(){
    this.setState({ radius: this.state.radius += 2})
  }

  playSound() {

  }

  stopInteriorRender() {
    this.setState({renderCockpit: false})
  }

  componentWillMount() {
    if (this.state.renderCockpit) {
      // Set interior's state here?
    }
    this.stopInteriorRender()
  }

  componentWillUnmount() {

  }

  handleClick(e) {
    e.preventDefault()
    e.stopPropagation()
    const panelId = e.currentTarget.parentElement.parentElement.id
    const moduleId = e.currentTarget.parentElement.id
    const buttonId = e.currentTarget.id
    // e.currentTarget.removeEventListener('click', this.handleClick)
    const typeOfwidget = e.currentTarget.className
    let nextState = _.cloneDeep(this.state)
    nextState[panelId][moduleId].currentState.push({buttonId: buttonId, typeOfwidget: typeOfwidget})
    console.log('NEW STATE', nextState)
    this.setState(nextState)
  }

  handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    resetClickHandlers(this.handleClick)
    const module1 = 1
    const module2 = 2
    let solution
    if (this.state.currentPhase === 1) {
      solution = solution1
    } else if (this.state.currentPhase === 2) {
      solution = solution2
    } else if (this.state.currentPhase === 3) {
      solution = solution3
    }
    if (_.isEqual(this.state[this.state.currentPhase], solution)) {
      this.props.addPhase()
      let newState = _.cloneDeep(this.state)
      newState[this.state.currentPhase][module1].currentState = []
      newState[this.state.currentPhase][module2].currentState = []
      newState.currentPhase++
      this.setState(newState)
    } else {
      this.props.addStrike()
      let newState = _.cloneDeep(this.state)
      newState[this.state.currentPhase][module1].currentState = []
      newState[this.state.currentPhase][module2].currentState = []
      newState.strikes++
      this.setState(newState)
    }
  }

  render() {
    let solvedPhase1 = false
    if (this.state.currentPhase > 1) {
      solvedPhase1 = true
    }
    let solvedPhase2 = false
    if (this.state.currentPhase > 2) {
      solvedPhase2 = true
    }
    let solvedPhase3 = false
    if (this.state.currentPhase > 3) {
      solvedPhase3 = true
    }
    return (
      <Entity >
        <Entity cubemap='folder: assets/skybox/nebula-skybox/' />
        <Entity
          obj-model={{obj: '#cockpit', mtl: '#cockpitMaterial'}}
          position={{x: 0, y: 4, z: 0}}
        />
        {generatePanel(-1.5, 2.5, 90, 1, this.handleClick, 1, this.handleSubmit, solvedPhase1)}
        {generatePanel(1.5, 2.5, -90, 2, this.handleClick, 2, this.handleSubmit, solvedPhase2)}
        {generatePanel(0, 0, 0, 3, this.handleClick, 3, this.handleSubmit, solvedPhase3)}
        {generateSubmitButton(0, 3.31, 4.2, 'green', 'submit-button', this.handleSubmit, '#900')}
        {getWarningLightOfColor(this.state.strikes)}
        {playSpaceshipAmbience()}
        {playSwitchOnSound()}
        {playSwitchOffSound()}
        <Sun radius ={this.state.radius}/>
        <DriverCam increaseSunSize = {this.increaseSunSize} strikes={this.state.strikes} />
      </Entity>
    )
  }
}
