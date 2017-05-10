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
import 'lodash'
import {solution1,solution2,solution3} from './validation'
import {playSpaceshipAmbience, playSwitchOnSound, playSwitchOffSound} from './soundEffects'

/* Call generatePanel with x coordinate, z coordinate, and y rotation */
import {generatePanel} from './panels'

/* Call getWarningLightOfColor with a string ('white', 'orange', or 'red')
to generate a warning light with proper hex value and animation */
import {getWarningLightOfColor} from './strike'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default class Simulation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit1 = this.handleSubmit1.bind(this)
    this.handleSubmit2 = this.handleSubmit2.bind(this)
    this.handleSubmit3 = this.handleSubmit3.bind(this)
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

  handleClick(e) {
    const panelId = e.currentTarget.parentElement.parentElement.id
    const moduleId = e.currentTarget.parentElement.id
    const buttonId = e.currentTarget.id
    const typeOfwidget = e.currentTarget.className
    console.log('this is the panelId', panelId)
    console.log('this is the moduleId', moduleId)
    console.log('this is the buttonId', buttonId)
    console.log('this is the typeOfwidget', typeOfwidget)
    let nextState = _.cloneDeep(this.state)
    nextState[panelId][moduleId].currentState.push({buttonId: buttonId, typeOfwidget: typeOfwidget})
    this.setState(nextState)
    console.log('this is your new state', this.state)
  }

  handleSubmit1(e) {
    let module1 = 1
    let module2 = 2
    if(_.isEqual(this.state[1], solution1)) {
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

  handleSubmit2(e) {
    let module1 = 1
    let module2 = 2
    console.log('this is solution2',solution2)
    console.log('this is currentState', this.state[2])
    if(_.isEqual(this.state[2], solution2)) {
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

  handleSubmit3(e) {
    let module1 = 1
    let module2 = 2
    if(_.isEqual(this.state[3], solution3)) {
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
    if(this.state.currentPhase > 1){
      solvedPhase1 = true
    }
    let solvedPhase2 = false
    if(this.state.currentPhase > 2){
      solvedPhase2 = true
    }
    let solvedPhase3 = false
    if(this.state.currentPhase > 3) {
      solvedPhase3 = true
    }
    return (
      <Entity >
        <Entity cubemap='folder: assets/skybox/nebula-skybox/' />
        <Entity
          static-body
          obj-model={{obj: '#cockpit', mtl: '#cockpitMaterial'}}
          position={{x: 0, y: 4, z: 0}}
        />
        {generatePanel(-1.5, 2.5, 90, 1, this.handleClick, 1, this.handleSubmit1, solvedPhase1)}
        {generatePanel(1.5, 2.5, -90, 2, this.handleClick, 2, this.handleSubmit2, solvedPhase2)}
        {generatePanel(0, 0, 0, 3, this.handleClick, 3, this.handleSubmit3, solvedPhase3)}
        {getWarningLightOfColor(this.state.strikes)}
        {playSpaceshipAmbience()}
        {playSwitchOnSound()}
        {playSwitchOffSound()}
        {Sun}
        {DriverCam(this.state.timeRemaining)}
      </Entity>
    )
  }
}
