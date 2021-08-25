import * as React from 'react'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import BrowseProducts from './BrowseProducts'
import Checkout from './Checkout'
import { useProducts } from './utils'
// import { useShoppingCart } from './ShoppingCartState'
import 'YesterTech/PrimaryLayout.scss'

type CartItem = {
  productId: number
  quantity: number
  name: string
  price: number
}

interface CartContextValue {
  cart: CartItem[]
  getQuantity(productId: number): number
  totalItems: number
  addToCart(productId: number, name: string, price: number, quantity?: number): void
  updateQuantity(productId: number, quantity: number): void
}

export const CartContext = React.createContext<CartContextValue>({
  cart: [],
  getQuantity() {
    return -1
  },
  totalItems: -1,
  addToCart() {},
  updateQuantity() {},
})

function PrimaryLayout(): React.ReactElement {
  const [cart, setCart] = React.useState([])

  let totalItems = React.useMemo(
    () =>
      cart.reduce<number>((prev, current) => {
        return prev + current.quantity
      }, 0),
    [cart]
  )

  let addToCart = React.useCallback((productId, name, price, quantity = 1) => {
    setCart((cart) => {
      const newCart = cart.concat([{ productId, quantity, name, price }])
      return newCart
    })
  }, [])

  let updateQuantity = React.useCallback((productId, quantity) => {
    setCart((cart) => {
      let newCart
      if (quantity > 0) {
        newCart = cart.map((product) => {
          return product.productId === productId ? { ...product, quantity } : product
        })
      } else {
        newCart = cart.filter((product) => product.productId !== productId)
      }
      return newCart
    })
  }, [])

  let getQuantity = React.useCallback(
    (productId) => {
      if (!Array.isArray(cart)) return 0
      return (cart.find((p) => p.productId === productId) || {}).quantity || 0
    },
    [cart]
  )

  return (
    <CartContext.Provider
      value={React.useMemo(() => {
        return {
          cart,
          getQuantity,
          totalItems,
          addToCart,
          updateQuantity,
        }
      }, [cart, getQuantity, totalItems, addToCart, updateQuantity])}
    >
      <div className="primary-layout">
        <div>
          <header className="primary-header">
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/checkout">Checkout</NavLink>
          </header>
          <main className="primary-content">
            <Switch>
              <Route path="/products">
                <BrowseProducts />
              </Route>
              <Route path="/checkout">
                <Checkout cart={cart} />
              </Route>
              <Redirect to="/products" />
            </Switch>
          </main>
        </div>
      </div>
    </CartContext.Provider>
  )
}

export default PrimaryLayout
