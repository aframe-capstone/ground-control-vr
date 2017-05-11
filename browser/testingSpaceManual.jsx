import React from 'react'
import Clock from 'react-countdown-clock'
import {Button, Icon, Row, Col, NavItem, Navbar} from 'react-materialize'
import Rules from './rules.jsx'
import Panels from './navinstrucpanels.jsx'

const panel1={
  module:[
    { name: 'Nanomatronic Kilowasher',
      subset: [{
        widget: 'Switch',
        action: 'Toggle 1x',
        order: 1,
      },
      {
        widget: 'Switch',
        action: 'Toggle 1x',
        order: 2
      },
      {
        widget: 'Switch',
        action: 'Toggle 1x',
        order: 3
      }]
    }
  ,
      {name: 'Gravitron Emitter',
      subset: [{
        widget: 'Button',
        action: 'Press 1x',
        order: 4
      },
      {
        widget: 'Button',
        action: 'Press 1x',
        order: 5
      },
      {
        widget: 'Switch',
        action: 'Toggle 1x',
        order: 6
      }]
    }
  ],
  number: 1
}

const panel2={
  module:[
    { name: 'Quantum Carburetor',
      subset: [{
        widget: 'Switch',
        action: 'Toggle 1x',
        order: 1,
      },
      {
        widget: 'Button',
        action: 'Press 1x',
        order: 3
      },
      {
        widget: 'Switch',
        action: 'Toggle 1x',
        order: 5
      }]
    }
  ,
      {name: 'Micro-Verse Battery',
      subset: [{
        widget: 'Button',
        action: 'Press 1x',
        order: 6
      },
      {
        widget: 'Switch',
        action: 'Toggle 1x',
        order: 4
      },
      {
        widget: 'Button',
        action: 'Press 1x',
        order: 2
      }]
    }
  ],
  number: 2
}

const panel3={
  module:[
    { name: 'Dark Matter Engine',
      subset: [{
        widget: 'Button',
        action: 'Press 1x',
        order: 5,
      },
      {
        widget: 'Switch',
        action: 'Toggle 1x',
        order: 3
      },
      {
        widget: 'Button',
        action: 'Press 1x',
        order: 1
      }]
    }
  ,
      {name: 'C-137',
      subset: [{
        widget: 'Switch',
        action: 'Toggle 1x',
        order: 2
      },
      {
        widget: 'Switch',
        action: 'Toggle 1x',
        order: 4
      },
      {
        widget: 'Button',
        action: 'Press 1x',
        order: 6
      }]
    }
  ],
  number: 3
}

const SPACE_BAR = 32

export default class Manual extends React.Component{
  constructor(props){
    super(props)
    this.state={
      tabSelected: 'rules',
      sendingmessage: false
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

   selectTab(id){
    this.setState({tabSelected: id})
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
    case SPACE_BAR:
      this.setState({sendingmessage: true})
      break
    default:
      break
    }
  }

  handleKeyUp(e) {
    switch (e.keyCode) {
    case SPACE_BAR:
      this.setState({sendingmessage: false})
      break
    default:
      break
    }
  }
    componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this))
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
  }

  render(){
    let pushToTalk =(<div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>)
    return(
    <div className="container">
      <Row>
        <Navbar brand='logo' left>
          <NavItem onClick={() => {this.selectTab('rules')}}>Rules</NavItem>
          <NavItem onClick={() => {this.selectTab('phase1')}}>Panel 1</NavItem>
          <NavItem onClick={() => {this.selectTab('phase2')}}>Panel 2</NavItem>
          <NavItem onClick={() => {this.selectTab('phase3')}}>Panel 3</NavItem>
        {
          this.state.sendingmessage === true && pushToTalk
        }
         </Navbar>
        {
          this.state.tabSelected === 'rules' && <Rules />
        }
        {
          this.state.tabSelected === 'phase1' && <Panels  panel={panel1}/>
        }
        {
          this.state.tabSelected === 'phase2' && <Panels panel={panel2}/>
        }
        {
          this.state.tabSelected === 'phase3' && <Panels panel={panel3}/>
        }
      </Row>
    </div>
    )
  }
}
