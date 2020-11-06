import React from 'react'
import ReactDOM from 'react-dom'
import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children, ...props }) {
  return (
    <button {...props} onClick={onClick} className="button">
      {children}
    </button>
  )
}

function App() {
  function handleClick() {
    // add to the cart
  }
  return (
    <div>
      <Button onClick={handleClick} aria-controls="panel">
        <MdShoppingCart color="red" />
        <span>Add to Cart</span>
        <MdShoppingCart color="red" />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
