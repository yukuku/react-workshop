import React, { useState, useEffect, useCallback } from 'react'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'

function useApi(api) {
  const [results, setResults] = useState(null)

  const stableApi = useCallback(api, [])

  useEffect(() => {
    let isCurrent = true
    stableApi().then(results => {
      if (!isCurrent) return
      setResults(results)
    })
    return () => (isCurrent = false)
  }, [stableApi])

  return results
}

function ProductProfile({ productId }) {
  const product = useApi(() => api.products.getProduct(productId))

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
