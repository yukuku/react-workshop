import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Minutes } from './Minutes'
// import { Minutes } from './Minutes.final'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

// UI is a function of state

function App() {
  return <Minutes></Minutes>
}

ReactDOM.render(<App />, document.getElementById('root'))
