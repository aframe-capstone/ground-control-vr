import React from 'react'
import Clock from 'react-countdown-clock'
import {Button, Icon, Row, Col, NavItem, Navbar} from 'react-materialize'
import Rules from './rules.jsx'
import Panels from './navinstrucpanels.jsx'




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
    console.log('PROPS: ', this.props)
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
      <link rel='stylesheet' type='text/css' href='aframe.css'/>


  <div className= 'informationWidgets' style={{position:'fixed', top:'5px' ,left:'9px'}}>
        <div className='clock'> <Clock  size={150} seconds={300} /> </div>

        <div className='strikes'>
            <i id='strike1' style={{color:this.props.strikes<1 ? '#D3D3D3' : 'red'}} className="fa fa-times-circle-o" aria-hidden="true"></i>
            <i id='strike2' style={{color:this.props.strikes<2 ? '#D3D3D3' : 'red'}}  className="fa fa-times-circle-o" aria-hidden="true"></i>
            <i id='strike3' style={{color:this.props.strikes<3 ? '#D3D3D3' : 'red'}} className="fa fa-times-circle-o" aria-hidden="true"></i>
        </div>


        <div className='phases'>
          <i className="fa fa-dot-circle-o" style={{color:this.props.phase !=1 ? '#D3D3D3' : 'green'}} aria-hidden="true"></i>
          <i className="fa fa-dot-circle-o" style={{color:this.props.phase!=2 ? '#D3D3D3' : 'green'}} aria-hidden="true"></i>
          <i className="fa fa-dot-circle-o" style={{color:this.props.phase !=3 ? '#D3D3D3' : 'green'}} aria-hidden="true"></i>
        </div>

</div>



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
