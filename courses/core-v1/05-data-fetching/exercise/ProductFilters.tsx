import * as React from 'react'
import ProductFilterList from 'YesterTech/ProductFilterList'
import { getCategories } from './utils'

const ProductFilters: React.FC = () => {
  let categories = useCategories()
  if (!categories) return <div>Loading Filters...</div>
  return (
    <div className="spacing">
      <ProductFilterList list={categories} urlKey="categories" label="Categories" />
    </div>
  )
}

function useCategories() {
  const [categories, setCategories] = React.useState<string[] | null>(null)
  React.useEffect(() => {
    let isMounted = true
    getCategories().then((categories) => {
      if (isMounted) {
        setCategories(categories)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])
  return categories
}

export default ProductFilters
