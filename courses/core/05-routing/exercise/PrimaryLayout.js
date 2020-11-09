import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrimaryHeader from 'YesterTech/PrimaryHeader'
import PrimaryFooter from 'YesterTech/PrimaryFooter'
import { useAuthState } from 'YesterTech/AuthState'
import 'YesterTech/PrimaryLayout.scss'

// Route Targets
import Home from 'YesterTech/Home'
import SignupForm from 'YesterTech/SignupForm'
import LoginForm from 'YesterTech/LoginForm'
import ProductsLayout from 'YesterTech/ProductsLayout'
import ProductSubNav from 'YesterTech/ProductSubNav'
import Checkout from 'YesterTech/Checkout'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'

// import Account from 'YesterTech/Account'
const Account = React.lazy(() => import('YesterTech/Account'))

function PrimaryLayout() {
  const { authenticated, dispatch } = useAuthState()
  const { cart } = useShoppingCart()

  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <Route path="/products">
          <ProductSubNav />
        </Route>
        <main className="primary-content">
          <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/signup" exact>
                <SignupForm />
              </Route>
              <Route path="/login" exact>
                <LoginForm
                  onAuthenticated={user => {
                    dispatch({ type: 'LOGIN', user })
                  }}
                />
              </Route>
              <Route path="/products">
                <ProductsLayout />
              </Route>
              {cart.length > 0 && (
                <Route path="/checkout">
                  <Checkout />
                </Route>
              )}
              {authenticated && (
                <Route
                  path="/account"
                  render={props => {
                    return <Account {...props} />
                  }}
                />
              )}
              <Redirect to="/" />
            </Switch>
          </React.Suspense>
        </main>
        <PrimaryFooter />
      </div>
    </div>
  )
}

export default PrimaryLayout
