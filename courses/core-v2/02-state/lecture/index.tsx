import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Minutes } from './Minutes'
// import { Minutes } from './Minutes.final'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function App() {
  return (
    <div>
      <Minutes></Minutes>
    </div>
  )
}

// function Report({ minutes }) {
//   return <div>Report: {minutes}</div>
// }

ReactDOM.render(<App />, document.getElementById('root'))
