import * as React from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

let count = 0

/*
React.useEffect(() => {}); // sync this effect with ALL changes
React.useEffect(() => {}, []); // sync this effect with NO changes
React.useEffect(() => {}, [sync, with, these]);
 */

function useMatchMedia(query: string) {
  let mql = React.useMemo(() => {
    return window.matchMedia(query)
  }, [query])

  let [matches, setMatches] = React.useState(mql.matches)

  React.useEffect(() => {
    let listener = (event) => {
      setMatches(event.matches)
    }
    return function cleanup() {
      mql.removeEventListener('change', listener)
    }
  }, [mql])

  return matches
}

function ProductsSidebar({ minWidth = 600 }) {
  let matches = useMatchMedia(`(min-width: ${minWidth}px)`)
  return matches ? (
    <aside>
      <ProductFilters />
    </aside>
  ) : null
}

export default ProductsSidebar
