import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
require('chai-enzyme')
import NavConsole from '../browser/navigator/navConsole.js'

describe('The navigator view',() =>{



  beforeEach('Create compnent', () =>{
    let wrapper = shallow(<NavConsole/>)
  })

  it('should have properly initialized initial state', ()=> {
    const wrapper = shallow(<NavConsole />)
      expect(wrapper.state().sendingmessage.toBe(false))
      expect(wrapper.state().tabSelected.toBe('rules'))
    })

  it('should have methods that properly update state', ()=>{

    wrapper.instance().selectTab()

  })

})
