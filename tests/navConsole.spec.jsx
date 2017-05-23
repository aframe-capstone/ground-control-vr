import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
require('chai-enzyme')
require('jsdom-global')()
import NavConsole from '../browser/navigator/navConsole.js'
describe('The navigator view',() =>{
  var wrapper
  beforeEach('Create compnent', () =>{
     wrapper = shallow(<NavConsole/>)
  })

  it('should have properly initialized initial state', ()=> {
    console.log(state);
      expect(wrapper.state.sendingmessage.toBe(false))
      expect(wrapper.state.tabSelected.toBe('rules'))
    })

  it('should have methods that properly update state', ()=>{

    wrapper.instance().selectTab()

  })

})
