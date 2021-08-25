import * as React from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

function someExpensiveCalculation() {
  return {
    // ..
  }
}

function ProductsSidebar() {
  let isWide = useMediaQuery('(min-width: 600px)')
  return isWide ? (
    <aside>
      <ProductFilters />
    </aside>
  ) : null
}

function useMediaQuery(query: string) {
  let [matches, setMatches] = React.useState(false)
  React.useLayoutEffect(() => {
    let media = window.matchMedia(query)
    setMatches(media.matches)
    let listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

export default ProductsSidebar
