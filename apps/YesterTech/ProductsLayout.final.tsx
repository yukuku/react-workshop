import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductsSidebar from 'YesterTech/ProductsSidebar.final'
import BrowseProducts from 'YesterTech/BrowseProducts.final'
import ProductProfile from 'YesterTech/ProductProfile.final'
import './ProductsLayout.scss'

function ProductsLayout() {
  return (
    <div className="products-layout">
      <ProductsSidebar />
      <div>
        <Switch>
          <Route path="/products" exact>
            <BrowseProducts />
          </Route>
          <Route path="/products/:productId">
            <ProductProfile />
          </Route>
          <Redirect to="/products" />
        </Switch>
      </div>
    </div>
  )
}

export default ProductsLayout
