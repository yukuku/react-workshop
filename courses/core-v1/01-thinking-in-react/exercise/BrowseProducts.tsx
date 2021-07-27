import * as React from 'react'
import StarRatings from './StarRatings'
// import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
// import Heading from 'YesterTech/Heading'

const products = [
  {
    id: 1,
    name: 'Mario Kart',
    rating: 5,
    brand: 'Nintendo',
    condition: 'new',
  },
  {
    id: 2,
    name: 'Donkey Kong',
    rating: 3.5,
    brand: 'Nintendo',
    condition: 'good',
  },
  {
    id: 3,
    name: 'Nintendo NES',
    rating: 4,
    brand: 'Nintendo',
    condition: 'fair',
  },
]

export default function BrowseProducts() {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <StarRatings rating={product.rating} />
          <div>
            <p>Brand: {product.brand}</p>
            <p>Condition: {product.condition}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function BrowseProductsVanilla() {
  return React.createElement(
    'div',
    null,
    products.map((product) =>
      React.createElement('div', { key: product.id }, [
        React.createElement('h1', null, product.name),
        React.createElement(StarRatings, { rating: product.rating }),
        React.createElement('div', null, [
          React.createElement('p', null, `Brand: ${product.brand}`),
          React.createElement('p', null, `Condition: ${product.condition}`),
        ]),
      ])
    )
  )
}
