import React, { useState, useEffect } from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

function ProductsSidebar({ width = 800 }) {
  const query = `(min-width: ${width}px)`
  const [isWide, setIsWide] = useState(() => {
    return window && window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => {
      setIsWide(media.matches)
    }
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return isWide ? (
    <aside>
      <ProductFilters />
    </aside>
  ) : null
}

export default ProductsSidebar
