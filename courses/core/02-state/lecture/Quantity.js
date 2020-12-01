import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function App() {
  const [quantity, setQuantity] = useState(0)

  return (
    <div>
      <Heading>Hi</Heading>
      <Quantity quantity={quantity} setQuantity={setQuantity}></Quantity>
      <Report quantity={quantity}></Report>
    </div>
  )
}

function Report({ quantity }) {
  return <div>Quantity: {quantity}</div>
}

const Heading = ({ children }) => {
  console.log('render')
  return <h1>{children}</h1>
}

function Quantity({ quantity, setQuantity }) {
  const [error, setError] = useState(null)

  function subtract() {
    const newQuantity = quantity - 1
    setQuantity(newQuantity)
    if (newQuantity < 0) {
      setError('cannot be less than 0')
    }
  }

  function add() {
    setQuantity(quantity + 1)
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button onClick={subtract} type="button" className="icon-button">
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">{quantity}</div>
        <div>
          <button onClick={add} type="button" className="icon-button">
            <FaPlusCircle />
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}
