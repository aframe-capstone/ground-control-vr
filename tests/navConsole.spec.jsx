import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
require('chai-enzyme')
require('jsdom-global')()
import NavConsole from '../browser/navigator/navConsole.js'
import NavContent from '../browser/navigator/navContent.js'
import Panels from '../browser/navigator/navinstrucpanels.js'
import {panel1, panel2, panel3} from '../browser/navigator/panelData.js'

describe('The navConsole component',() =>{
  let wrapper,inst
  beforeEach('Create component', () =>{
     wrapper = shallow(<NavConsole/>)
     inst = wrapper.instance()
  })

  it('should have properly initialized initial state', ()=> {
      expect(inst.state.sendingmessage).to.be.false
      expect(inst.state.tabSelected).to.equal('rules')
    })

  it('selectTab should properly update the state.tabSelected', ()=>{
    inst.selectTab('phase1')
    expect(inst.state.tabSelected).to.equal('phase1')

  })

  it('handleKeyDown should properly update state.sendingmessage', ()=>{
    inst.handleKeyDown('SPACE_BAR')
    expect(inst.state.sendingmessage).to.be.false
  })

  it('handleKeyUp should properly update state.sendingmessage', ()=>{
    inst.handleKeyUp('SPACE_BAR')
    expect(inst.state.sendingmessage).to.be.false
  })

})
