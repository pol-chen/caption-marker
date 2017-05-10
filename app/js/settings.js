'use strict'

require('../less/app.less')

import React from 'react'
import ReactDOM from 'react-dom'

import Settings from './containers/Settings'

console.error = (() => {
  var error = console.error
  return function(exception) {
    if ((exception + '').indexOf('Warning: Unknown props') != 0) {
      error.apply(console, arguments)
    }
  }
})()

ReactDOM.render(<Settings />, document.getElementById('root'))
