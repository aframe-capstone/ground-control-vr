import React from 'react'
import Rules from './rules.jsx'
import Panels from './navinstrucpanels.jsx'
import PhasesWidget from './phases.jsx'
import StrikesWidget from './strikes.jsx'
import NavigationBar from './navBar.jsx'
import CountDown from './clock.jsx'
import NavContent from './navContent.jsx'
import Footer from './footer.jsx'

const SPACE_BAR = 32

export default class NavConsole extends React.Component{

  constructor(props){
    super(props)
    this.state={
      height: window.innerHeight,
      tabSelected:'rules',
    }
    this.selectTab = this.selectTab.bind(this)
  }

  selectTab(id){
   this.setState({tabSelected: id})
  }

updateDimensions() {
     this.setState({height: window.innerHeight});
 }

 componentWillMount() {
     this.updateDimensions();
 }
 componentDidMount(){
     window.addEventListener("resize", this.updateDimensions.bind(this));
 }
 componentWillUnmount() {
     window.removeEventListener("resize", this.updateDimensions.bind(this));
 }

 render(){
   console.log(this.props, 'props');
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
      <div className ='navContainer' style={{height: this.state.height}}>
        <link rel='stylesheet' type='text/css' href='aframe.css'/>
        <link href="path/to/react-activity.css" />
        <div className='row1'>
           <div className='widget' id='clock' style={{flex:1}}>
              <div> Time until Impact</div>
              { this.props.driverStatus && this.props.navigatorStatus ?<CountDown/> : null}
           </div>
            <div className='widget-black' id='navbar'style={{flex:4}}>
              <NavigationBar tabSelected={this.state.tabSelected} selectTab={this.selectTab}/>
            </div>
            <div className='widget' id='strikesphase' style={{flex:1}}>
              <StrikesWidget strikes={this.props.strikes}/>
              <PhasesWidget phase={this.props.phase}/>
            </div>
        </div>

        <div className='row2' style={{height:this.state.height-250}}>

          <div className='widget-black' id='content' style={{flex:6}}>
            <NavContent tabSelected={this.state.tabSelected}/>
          </div>

            {this.props.spaceBarDown ? <div id='indicator' style={{background:'none'}}>
              <div className="loader"></div>
              <div style={{fontSize:'15px', fontColor:'red'}}> Message Recording...</div>
            </div> : null}
        </div>
        <div className='row3'>
          <div className='widget' id='footer' style={{flex:10}}>
            <Footer />
          </div>
        </div>
       </div>
    )
  }
}
