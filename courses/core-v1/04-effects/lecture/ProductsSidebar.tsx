import * as React from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

let count = 0

/*
React.useEffect(() => {}); // sync this effect with ALL changes
React.useEffect(() => {}, []); // sync this effect with NO changes
React.useEffect(() => {}, [sync, with, these]);
 */

function ProductsSidebar({ minWidth = 600 }) {
  let mql = React.useMemo(() => {
    return window.matchMedia(`(min-width: ${minWidth}px)`)
  }, [minWidth])

  let [matches, setMatches] = React.useState(mql.matches)

  React.useEffect(() => {
    console.log('effect callback fired')
    let listener = (event) => {
      setMatches(event.matches)
    }

    mql.addEventListener('change', listener)
    return function cleanup() {
      console.log('cleanup  fired')
      mql.removeEventListener('change', listener)
    }
  }, [mql])

  return matches ? (
    <aside>
      <ProductFilters />
    </aside>
  ) : null
}

export default ProductsSidebar
