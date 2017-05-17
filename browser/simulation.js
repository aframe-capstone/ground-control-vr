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
import {SpaceshipAmbience} from './soundEffects'
import Failure from './failure'
import {setUpRecording} from './audio'
import {setButtonPressedColor, resetButtonPressedColors, resetClickHandlers} from './UI'
import stopDefaultAndPropagation from './utils/events'
import {MODULE_ONE, MODULE_TWO} from './utils/constants'

/* Call generatePanel with x coordinate, z coordinate, and y rotation */
import {generatePanel, generateSubmitButton} from './panels'

/* Call getWarningLightOfColor with a string ('white', 'orange', or 'red')
to generate a warning light with proper hex value and animation */
import {getWarningLightOfColor} from './strike'

export default class Simulation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      distance: 320,
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
      timeLeft: true
    }
    this.moveSunCloser = this.moveSunCloser.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setTimeLeft = this.setTimeLeft.bind(this)
  }

  moveSunCloser() {
    if (this.state.distance > 55) this.setState({distance: this.state.distance -= 1})
  }

  componentDidMount() {
    setUpRecording(this.props.isNavigator)
  }

  handleClick(e) {
    stopDefaultAndPropagation(e)
    const panelId = e.currentTarget.parentElement.parentElement.id
    const moduleId = e.currentTarget.parentElement.id
    const buttonId = e.currentTarget.id
    setButtonPressedColor(e.currentTarget)
    const typeOfwidget = e.currentTarget.className
    const nextState = _.cloneDeep(this.state)
    nextState[panelId][moduleId].currentState.push({buttonId: buttonId, typeOfwidget: typeOfwidget})
    this.setState(nextState)
  }

  handleSubmit(e) {
    stopDefaultAndPropagation(e)
    resetButtonPressedColors()
    this.checkSolution(this.whichSolutionToCheck())
  }

  whichSolutionToCheck() {
    let solution
    if (this.state.currentPhase === 1) {
      solution = solution1
    } else if (this.state.currentPhase === 2) {
      solution = solution2
    } else if (this.state.currentPhase === 3) {
      solution = solution3
    }
    return solution
  }

  checkSolution(solution) {
    if (_.isEqual(this.state[this.state.currentPhase], solution)) {
      this.props.addPhase()
      const newState = this.cloneAndResetCurrentState()
      newState.currentPhase++
      this.setState(newState)
    } else {
      this.props.addStrike()
      const newState = this.cloneAndResetCurrentState()
      newState.strikes++
      this.setState(newState)
    }
  }

  cloneAndResetCurrentState() {
    const newState = _.cloneDeep(this.state)
    newState[this.state.currentPhase][MODULE_ONE].currentState = []
    newState[this.state.currentPhase][MODULE_TWO].currentState = []
    return newState
  }

  setTimeLeft(bool) {
    this.setState({timeLeft: bool})
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
        {generateSubmitButton(0, 3.62, 4.44, 'green', 'submit-button', this.handleSubmit, '#900')}
        {this.state.currentPhase > 3
          ? getWarningLightOfColor(null, null, true)
          : getWarningLightOfColor(this.state.strikes, this.state.timeLeft)}
        <SpaceshipAmbience />
        <Sun distance={this.state.distance}/>
        <DriverCam moveSunCloser={this.moveSunCloser} phase={this.state.currentPhase} strikes={this.state.strikes} setTimeLeft={this.setTimeLeft} timeLeft={this.state.timeLeft}/>
      </Entity>
    )
  }
}
