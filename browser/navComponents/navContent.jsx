import React from 'react'
import {Row, Navbar, NavItem} from 'react-materialize'
import Rules from './rules.jsx'
import Panels from './navinstrucpanels.jsx'
import {panel1, panel2, panel3} from '../panelData.js'
console.log(panel1, panel2, panel3);

export default class  NavigationBar extends React.Component{
  constructor(props){
    super(props)
  }

render(){
    {console.log(this.props.tabSelected, 'tab select')}
return(

  <div>
    {
      this.props.tabSelected === 'rules' && <Rules/>
    }

    {
      this.props.tabSelected === 'phase1' && <Panels  panel={panel1}/>
    }
    {
      this.props.tabSelected === 'phase2' && <Panels panel={panel2}/>
    }

    {
      this.props.tabSelected === 'phase3' && <Panels panel={panel3}/>
    }
  </div>
)
  }
}
