import * as React from 'react'
import StarRatings from './StarRatings'
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
  console.log(products)

  return (
    <div>
      {products.map((product, index) => {
        return (
          <React.Fragment key={product.id}>
            <h1>{product.name}</h1>
            <StarRatings rating={product.rating} />
            <p>Brand: {product.brand}</p>
            <p>Condition: {product.condition}</p>
          </React.Fragment>
        )
      })}
    </div>
  )
}
