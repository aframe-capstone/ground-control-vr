import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/strike-phase.js'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      createLogger({collapsed: true}),
      thunkMiddleware
    )
  )
)

export default store
