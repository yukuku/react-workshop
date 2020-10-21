import React, { useState, useEffect, useCallback } from 'react'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'

function usePromise(p) {
  const [results, setResults] = useState(null)

  useEffect(() => {
    let isCurrent = true
    p().then(product => {
      if (!isCurrent) return
      setResults(product)
    })
    return () => (isCurrent = false)
  }, [p])

  return results
}

function ProductProfile({ productId }) {
  const product = usePromise(useCallback(() => api.products.getProduct(productId), [productId]))

  if (!product) return <div>Loading...</div>

  return (
    <div className="spacing">
      <Heading>{product.name}</Heading>
      <StarRatings rating={product.rating} />
    </div>
  )
}

export default function App() {
  return (
    <div className="effects-in-custom-hooks">
      <ProductProfile productId={2} />
    </div>
  )
}
