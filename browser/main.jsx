'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import App from './index.js'
import store from './store.jsx'


render(
      <Provider store={store}>
          <App />
      </Provider>, document.getElementById('sceneContainer')
       )
