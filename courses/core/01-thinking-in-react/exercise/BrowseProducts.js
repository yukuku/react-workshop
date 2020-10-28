import React from 'react'
// import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
// import Heading from 'YesterTech/Heading'

import StarRatings from './StarRatings'

const products = [
  {
    id: 1,
    name: 'Mario Kart',
    rating: 5,
    brand: 'Nintendo',
    condition: 'new'
  },
  {
    id: 2,
    name: 'Other',
    rating: 5,
    brand: 'Nintendo',
    condition: 'new',
    special: true
  }
]

export default function BrowseProducts() {
  return (
    <div>
      {products.map(product => {
        return (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <div>
              <StarRatings rating={product.rating} />
            </div>
            <div>{product.brand}</div>
          </div>
        )
      })}
    </div>
  )
}
