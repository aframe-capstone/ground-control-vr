import store from '../store'
import {setStrike, setPhase, setDriverStatus, setNavigatorStatus} from '../reducers/strike-phase'
import $ from 'jquery'

// FIREBASE MODULE
/* global firebase location */

var config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID
}

firebase.initializeApp(config)
console.log('FIREBASE initialized')
export const setupDataBase = (referenceString) => firebase.database().ref(referenceString)

const roomName = location.hash.substring(1, location.hash.length)
const strikesDB = setupDataBase(`${roomName}/strikes`)
const phaseDB = setupDataBase(`${roomName}/phase`)
const navigatorStatusDB = setupDataBase(`${roomName}/navigatorStatus`)
const driverStatusDB = setupDataBase(`${roomName}/driverStatus`)

export const startSyncingPhaseAndStrikes = isNavigator => {
  if (!isNavigator) {
    // DRIVER WRITE ONLY for strikes and phases
    const initialState = store.getState()
    let currentStrikes = initialState.strikes
    let currentPhase = initialState.phase
    strikesDB.set(currentStrikes)
    phaseDB.set(currentPhase)
    driverStatusDB.set(true)

    const handleChange = () => {
      let previousStrikes = currentStrikes
      let previousPhase = currentPhase
      let state = store.getState()
      let currentStrikes = state.strikes
      let currentPhase = state.phase

      if (previousStrikes !== currentStrikes) {
        strikesDB.set(currentStrikes)
        // console.log('Strikes changed from', previousStrikes, 'to', currentStrikes)
      }
      if (previousPhase !== currentPhase) {
        // console.log('Phase changed from', previousPhase, 'to', currentPhase)
        phaseDB.set(currentPhase)
      }
    }
    const unsubscribe = store.subscribe(handleChange)

    navigatorStatusDB.on('value', (snapshot) => {
      const navigatorStatus = snapshot.val()
      if (navigatorStatus) {
        store.dispatch(setNavigatorStatus(true))
      } else {
        store.dispatch(setNavigatorStatus(false))
      }
    })

    // Set status on exit
    $(window).on('beforeunload', () => {
      driverStatusDB.set(false)
    })
  } else {
    // NAVIGATOR READONLY
    navigatorStatusDB.set(true)

    strikesDB.on('value', (snapshot) => {
      const state = store.getState()
      const DBStrikes = snapshot.val()
      let currentStrikes = state.strikes
      // console.log('CURRENT STRIKES: ', currentStrikes)
      // console.log('DB STRIKES: ', DBStrikes)
      if (currentStrikes !== DBStrikes) {
        // console.log('INCREMENTING STRIKES')
        store.dispatch(setStrike(DBStrikes))
      }
    })

    // NAVIGATOR
    phaseDB.on('value', (snapshot) => {
      const state = store.getState()
      let currentPhase = state.phase
      // console.log('CURRENT PHASE: ', currentPhase)
      const DBPhase = snapshot.val()
      // console.log('DB PHASE: ', DBPhase)

      if (currentPhase !== DBPhase) {
        // console.log('INCREMENTING PHASE')
        store.dispatch(setPhase(DBPhase))
      }
    })

    driverStatusDB.on('value', (snapshot) => {
      const driverStatus = snapshot.val()
      if (driverStatus) {
        store.dispatch(setDriverStatus(true))
      } else {
        store.dispatch(setDriverStatus(false))
      }
    })

    // Set status on exit
    $(window).on('beforeunload', () => {
      navigatorStatusDB.set(false)
    })
  }
}
