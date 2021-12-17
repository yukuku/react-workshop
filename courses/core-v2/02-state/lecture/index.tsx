import React from 'react'
import ReactDOM from 'react-dom'
import { Minutes } from './Minutes'
// import { Minutes } from './Minutes.final'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function App() {
  const [minutes, setMinutes] = React.useState(0)

  return (
    <>
      <Minutes minutes={minutes} setMinutes={setMinutes} />
      <Report minutes={minutes} />
    </>
  )
}

function Report({ minutes }) {
  return <div>Report: {minutes}</div>
}

ReactDOM.render(<App />, document.getElementById('root'))
