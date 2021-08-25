import * as React from 'react'
import { useProducts } from './utils'
// import { useShoppingCart } from './ShoppingCartState'
import BrowseProductItem from './BrowseProductItem'
import { CartContext } from './PrimaryLayout'

function BrowseProducts() {
  const products = useProducts()
  const {totalItems} = React.useContext(CartContext)

  return (
    <div className="spacing">
      <nav>
        <span>View Cart ({totalItems})</span>
      </nav>
      <hr />
      {products.map((product) => {
        return (
          <BrowseProductItem
            key={product.id}
            productId={product.id}
            name={product.name}
            price={product.price}
            imagePath={product.imagePath}
          />
        )
      })}
    </div>
  )
}

export default BrowseProducts
