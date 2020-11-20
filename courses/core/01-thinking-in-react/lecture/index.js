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
  function handleClick() {
    console.log('Add to cart stuff')
  }
  return (
    <div>
      <Button onClick={handleClick}>
        <MdShoppingCart color="blue" />
        <span>Add to Shopping Cart</span>
        <MdShoppingCart color="blue" />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
