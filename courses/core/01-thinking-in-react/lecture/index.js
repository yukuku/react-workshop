import React from 'react'
import ReactDOM from 'react-dom'
import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const Button = function({ children, ...props }) {
  return (
    <button {...props} className="button">
      {children}
    </button>
  )
}

function App() {
  function addToCart() {
    console.log('add something to the shopping cart')
  }

  return (
    <div>
      <Button onClick={addToCart} aria-controls="some">
        <MdShoppingCart />
        <span>Add to cart</span>
        <MdShoppingCart />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
