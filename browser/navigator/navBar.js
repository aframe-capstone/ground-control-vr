import React from 'react'
import Rules from './rules'
import Panels from './navinstrucpanels'
import {panel1, panel2, panel3} from './panelData'

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='tabContainer' style={{display: 'flex', height: '100%'}}>
        <div className={'tab ' + (this.props.tabSelected === 'rules' ? 'selected' : '')} style={{flex: 1}} onClick={() => { this.props.selectTab('rules') }}>
          <div className='light'></div>
          <div className='text'>Rules</div>
        </div>
        <div className={'tab ' + (this.props.tabSelected === 'phase1' ? 'selected' : '')} style={{flex: 1}} onClick={() => { this.props.selectTab('phase1') }}>
          <div className='light'></div>
          <div className='text'>Panel 1</div>
        </div>
        <div className={'tab ' + (this.props.tabSelected === 'phase2' ? 'selected' : '')} style={{flex: 1}} onClick={() => { this.props.selectTab('phase2') }}>
          <div className='light'></div>
          <div className='text'>Panel 2</div>
        </div>
        <div className={'tab ' + (this.props.tabSelected === 'phase3' ? 'selected' : '')} style={{flex: 1}} onClick={() => { this.props.selectTab('phase3') }}>
          <div className='light'></div>
          <div className='text'>Panel 3</div>
        </div>
      </div>
    )
  }
}
