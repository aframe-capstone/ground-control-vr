'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import App from './index'
import store from './store'

render(<Provider store={store}>
        <App />
      </Provider>, document.getElementById('sceneContainer'))
