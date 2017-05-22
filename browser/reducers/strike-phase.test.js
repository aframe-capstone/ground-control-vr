import { createStore } from 'redux'
import { spy } from 'sinon'
chai.use(require('sinon-chai'))
import store from '../store.js'
import {addStrike, addPhase, setStrike, setPhase, setNavigatorStatus, setDriverStatus} from './strike-phase'

/* global describe it beforeEach */

describe('Testing Redux State Changes', () => {
  let initialState
  beforeEach('Reset the state to initial state', () => {
    store.dispatch(setStrike(0))
    store.dispatch(setPhase(1))
    store.dispatch(setNavigatorStatus(false))
    store.dispatch(setDriverStatus(false))
    initialState = store.getState()
  })

  it('Has the correct initial state', () => {
    expect(initialState.phase).to.eql(1)
    expect(initialState.strikes).to.eql(0)    
    expect(initialState.navigatorStatus).to.eql(false)
    expect(initialState.driverStatus).to.eql(false)
  })


})

// describe("<Products />'s connection", () => {
//   const state = {
//     products: {
//       products: sampleProducts
//     }
//   }

//   let root, store
//   beforeEach('create store and render the root', () => {
//     store = createStore(state => state, state)
//     spy(store, 'dispatch')
//     root = shallow(<ProductsContainer store={store} />)
//   })

//   it('gets prop.products from state.products.products', () => {
//     expect(root.find(Products)).to.have.prop('products').eql(state.products.products)
//   })
// })