import React, { useState, useEffect } from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

function useMedia(query) {
  const [matches, setMatches] = useState(() => {
    return window && window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

function ProductsSidebar({ width = 800 }) {
  const isWide = useMedia(`(min-width: ${width}px)`)
  // const dark = useMedia(`(prefers-color-scheme: dark)`)

  return isWide ? (
    <aside>
      <ProductFilters />
    </aside>
  ) : null
}

export default ProductsSidebar
