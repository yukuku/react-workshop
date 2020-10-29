import React, { useState, useEffect, useCallback } from 'react'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'

function useApi(api) {
  const [results, setResults] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api().then(results => {
      if (!isCurrent) return
      setResults(results)
    })
    return () => (isCurrent = false)
  }, [api])

  return results
}

function ProductProfile({ productId }) {
  const getProduct = useCallback(() => api.products.getProduct(productId), [productId])
  const product = useApi(getProduct)

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
