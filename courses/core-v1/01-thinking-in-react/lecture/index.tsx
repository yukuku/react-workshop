import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as propTypes from 'prop-types'
// import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

let data = [{ name: 'Chance ' }]

function Layout() {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'header',
      null,
      data.map((item) => <div>{item.name}</div>)
    )
  )
}

// Let's go
function App() {
  return React.createElement(Layout)
}

ReactDOM.render(<App />, document.getElementById('root'))
