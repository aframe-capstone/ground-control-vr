import store from './store.jsx'
import {setStrike, setPhase} from './reducers/strike-phase.js'

// FIREBASE MODULE
/* global firebase */
var config = {
  apiKey: "AIzaSyCao3V8b2INzVjRy8ZzTsSXBP-z3gZSJiI",
  authDomain: "testing-firebase-5f787.firebaseapp.com",
  databaseURL: "https://testing-firebase-5f787.firebaseio.com",
  projectId: "testing-firebase-5f787",
  storageBucket: "testing-firebase-5f787.appspot.com",
  messagingSenderId: "930281689218"
}

firebase.initializeApp(config)
console.log('FIREBASE initialized')
export const setupDataBase = (referenceString) => firebase.database().ref(referenceString)

const roomName = location.hash.substring(1, location.hash.length) 
const strikesDB = setupDataBase(`${roomName}/strikes`)
const phaseDB = setupDataBase(`${roomName}/phase`)

export const startSyncingPhaseAndStrikes = isNavigator => {
  if (!isNavigator) {
    // DRIVER WRITE ONLY
    const initialState = store.getState()
    let currentStrikes = initialState.strikes
    let currentPhase = initialState.phase
    strikesDB.set(currentStrikes)
    phaseDB.set(currentPhase)

    const handleChange = () => {
      let previousStrikes = currentStrikes
      let previousPhase = currentPhase
      let state = store.getState()
      let currentStrikes = state.strikes
      let currentPhase = state.phase 

      if (previousStrikes !== currentStrikes) {
        strikesDB.set(currentStrikes)
        console.log('Strikes changed from', previousStrikes, 'to', currentStrikes)
      }
      if(previousPhase !== currentPhase) {
        console.log('Phase changed from', previousPhase, 'to', currentPhase)    
        phaseDB.set(currentPhase)
      }
    }
    const unsubscribe = store.subscribe(handleChange)
    
  } else {
    // NAVIGATOR READONLY
    strikesDB.on('value', (snapshot) => {
      const state = store.getState()
      const DBStrikes = snapshot.val()
      let currentStrikes = state.strikes
      console.log('CURRENT STRIKES: ', currentStrikes)
      console.log('DB STRIKES: ', DBStrikes)
      if(currentStrikes !== DBStrikes){
        console.log('INCREMENTING STRIKES')
        store.dispatch(setStrike(DBStrikes))
      }
    })

    // NAVIGATOR
    phaseDB.on('value', (snapshot) => {
      const state = store.getState()
      let currentPhase = state.phase
      console.log('CURRENT PHASE: ', currentPhase)
      const DBPhase = snapshot.val()
      console.log('DB PHASE: ', DBPhase)

      if(currentPhase !== DBPhase){
        console.log('INCREMENTING PHASE')
        store.dispatch(setPhase(DBPhase))
      }
    })
  }
}



