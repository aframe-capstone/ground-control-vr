import { createStore } from 'redux'
import chai, { expect } from 'chai'
import reducer from '../browser/reducers/strike-phase'
import {addStrike, addPhase, setStrike, setPhase, setNavigatorStatus, setDriverStatus, PASSING, FAILING, SET_PHASE, SET_STRIKE, SET_DRIVER_STATUS, SET_NAVIGATOR_STATUS} from '../browser/reducers/strike-phase'

/* global describe it beforeEach */

describe('Redux', () => {
  
  describe('Testing Action Creators', () => {

    it('Add Strike', () => {
      const actionCreator = addStrike()
      expect(actionCreator).to.eql({
        type: FAILING
      })
    })

    it('Add Phase', () => {
      const actionCreator = addPhase()
      expect(actionCreator).to.eql({
        type: PASSING
      })  
    })

    it('Set Strike', () => {
      const actionCreator = setStrike(5)
      expect(actionCreator).to.eql({
        type: SET_STRIKE,
        strikes: 5
      })    
    })

    it('Set Phase', () => {
      const actionCreator = setPhase(5)
      expect(actionCreator).to.eql({
        type: SET_PHASE,
        phase: 5 
      })    
    })

    it('Set Navigator Status', () => {
      const actionCreator = setNavigatorStatus(true)
      expect(actionCreator).to.eql({
        type: SET_NAVIGATOR_STATUS,
        navigatorStatus: true 
      })    
    })
    
    it('Set Driver Status', () => {
      const actionCreator = setDriverStatus(true)
      expect(actionCreator).to.eql({
        type: SET_DRIVER_STATUS,
        driverStatus: true 
      })     
    })
  })

  describe('Testing State Changes', () => {
    let store

    beforeEach('Reset the state to initial state', () => {
      store = createStore(reducer)
    })

    it('Has the correct initial state', () => {
      let currState = store.getState()
      expect(currState.phase).to.eql(1)
      expect(currState.strikes).to.eql(0)    
      expect(currState.navigatorStatus).to.eql(false)
      expect(currState.driverStatus).to.eql(false)
    })

    it('Can increment strikes', () => {
      store.dispatch(addStrike())
      let currState = store.getState()
      expect(currState.strikes).to.eql(1)    
    })

    it('Can set strikes', () => {
      store.dispatch(setStrike(5))
      let currState = store.getState()
      expect(currState.strikes).to.eql(5)    
    })

    it('Can increment phase', () => {
      store.dispatch(addPhase())
      let currState = store.getState()
      expect(currState.phase).to.eql(2)    
    })

    it('Can set phase', () => {
      store.dispatch(setPhase(5))
      let currState = store.getState()
      expect(currState.phase).to.eql(5)    
    })
    
    it('Can set driver status', () => {
      store.dispatch(setDriverStatus(true))
      let currState = store.getState()
      expect(currState.driverStatus).to.eql(true)    
    })

    it('Can set navigator status', () => {
      store.dispatch(setNavigatorStatus(true))
      let currState = store.getState()
      expect(currState.navigatorStatus).to.eql(true)    
    })
  })
})
