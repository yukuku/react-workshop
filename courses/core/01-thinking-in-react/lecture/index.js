import React from 'react'
import ReactDOM from 'react-dom'
import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {typeof children === 'function' ? children({ iconProps: { color: 'green' } }) : children}
    </button>
  )
}

function App() {
  function onClick() {}

  return (
    <div>
      <Button onClick={onClick}>
        <MdShoppingCart />
        <span>Add to cart</span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
