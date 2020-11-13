import React from 'react'
import ReactDOM from 'react-dom'
import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ children, onClick, ...rest }) {
  return (
    <button {...rest} onClick={onClick} className="button">
      {children}
    </button>
  )
}

function App() {
  function addToCart() {
    // adding something to the cart
  }
  return (
    <div>
      <Button onClick={addToCart} id="twitch">
        <MdShoppingCart color="red" />
        <span>Add to cart</span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
