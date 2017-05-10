import React from 'react'
import Clock from 'react-countdown-clock'
import {Button, Icon, Row, Col, NavItem, Navbar} from 'react-materialize'
import Rules from './rules.jsx'
import Phase1 from './phase1.jsx'
import Phase2 from './phase2.jsx'
import Phase3 from './phase3.jsx'

export default class Manual extends React.Component{
  constructor(props){
    super(props)
    this.state={
      tabSelected: 'rules'
    }
  }

   selectTab(id){
    this.setState({tabSelected: id})
  }

  render(){
    return(
    <div>
      <Row>
        <Navbar brand='logo' left>
          <NavItem onClick={() => {this.selectTab('rules')}}>Rules</NavItem>
          <NavItem onClick={() => {this.selectTab('phase1')}}>Panel 1</NavItem>
          <NavItem onClick={() => {this.selectTab('phase2')}}>Panel 2</NavItem>
          <NavItem onClick={() => {this.selectTab('phase3')}}>Panel 3</NavItem>
        </Navbar>
        {
          this.state.tabSelected === 'rules' && <Rules />
        }
        {
          this.state.tabSelected === 'phase1' && <Phase1 />
        }
        {
          this.state.tabSelected === 'phase2' && <Phase2 />
        }
        {
          this.state.tabSelected === 'phase3' && <Phase3 />
        }
      </Row>
    </div>
    )
  }
}
