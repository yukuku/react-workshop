import React from 'react'
import PropTypes from 'prop-types'
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
    name: 'Donkey Kong',
    rating: 3.5,
    brand: 'Nintendo',
    condition: 'good'
  },
  {
    id: 3,
    name: 'Nintendo NES',
    rating: 4,
    brand: 'Nintendo',
    condition: 'fair'
  }
]

export default function BrowseProducts() {
  return (
    <div>
      {products.map(product => {
        return (
          <BrowseProductItem
            key={product.id}
            name={product.name}
            rating={product.rating}
            brand={product.brand}
          />
        )
      })}
    </div>
  )
}

function BrowseProductItem({ name, brand, rating }) {
  return (
    <div>
      <h1>{name}</h1>
      <div>
        <StarRatings rating={rating} />
      </div>
      <div>{brand}</div>
    </div>
  )
}

BrowseProductItem.propTypes = {
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
}
