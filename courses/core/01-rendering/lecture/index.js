import React from 'react'
import ReactDOM from 'react-dom'
import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} type="button" className="button">
      {children}
    </button>
  )
}

function App() {
  function onClick() {
    console.log('logic for adding to cart')
  }

  return (
    <div>
      <Button onClick={onClick}>
        <MdShoppingCart />
        <span>Add to Cart</span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
