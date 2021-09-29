import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Minutes } from './Minutes'
// import { Minutes } from './Minutes.final'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

class App extends React.Component {
  render() {
    return (
      <div>
        <Minutes />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
