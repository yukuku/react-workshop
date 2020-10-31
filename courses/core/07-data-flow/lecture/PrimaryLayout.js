import React from 'react'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import BrowseProducts from './BrowseProducts'
import Checkout from 'YesterTech/Checkout'
import { useShoppingCart } from './ShoppingCartState'
import 'YesterTech/PrimaryLayout.scss'

function PrimaryLayout() {
  const { cart } = useShoppingCart()

  return (
    <div className="primary-layout">
      <div>
        <header className="primary-header">
          <NavLink to="/products">Products</NavLink>
          {cart.length > 0 && <NavLink to="/checkout">Checkout</NavLink>}
        </header>
        <main className="primary-content">
          <Switch>
            <Route path="/products">
              <BrowseProducts />
            </Route>
            {cart.length > 0 && (
              <Route path="/checkout">
                <Checkout cart={cart} />
              </Route>
            )}
            <Redirect to="/products" />
          </Switch>
        </main>
      </div>
    </div>
  )
}

export default PrimaryLayout
