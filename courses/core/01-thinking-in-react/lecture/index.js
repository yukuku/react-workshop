import React from 'react'
import ReactDOM from 'react-dom'
import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

function App() {
  function onClick() {
    console.log('add something to the cart')
  }

  return (
    <div>
      <Button onClick={onClick}>
        <MdShoppingCart color="red" />
        Add to cart
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
