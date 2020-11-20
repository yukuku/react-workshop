import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function Quantity() {
  const [quantity, setQuantity] = useState(0)
  const [error, setError] = useState()

  function subtract() {
    const nextQuantity = quantity - 1
    setQuantity(nextQuantity)
    if (nextQuantity < 0) {
      setError('Cannot be less than 0')
    }
  }

  function add() {
    setQuantity(quantity + 1)
  }

  const output = (
    <div className="quantity-picker">
      <div>
        <SomeComp></SomeComp>
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
      <p>{error}</p>
    </div>
  )
  console.log(output)
  return output
}

function SomeComp() {
  console.log('child rerender')
  return (
    <div id="somecomp">
      <Other></Other>
    </div>
  )
}

function Other() {
  console.log('other rerender')
  return <div id="other"></div>
}
