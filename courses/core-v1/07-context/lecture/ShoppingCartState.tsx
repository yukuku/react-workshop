import * as React from 'react'
import { CartProduct } from 'YesterTech/types'

const ShoppingCartContext = React.createContext({} as ShoppingCartContextValue)

export function SomeChild() {
  return (
    <div>
      <h2>Hello</h2>
      <ShoppingCartContext.Consumer>
        {(value) => {
          console.log({ value })
          return (
            <section>
              <p>Total items in cart: {value.getCartSize()}</p>
            </section>
          )
        }}
      </ShoppingCartContext.Consumer>
    </div>
  )
}

export const ShoppingCartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = React.useState([])

  return (
    <ShoppingCartContext.Provider
      value={{
        addToCart(productId, name, price, quantity = 1) {
          const newCart = cart.concat([{ productId, quantity, name, price }])
          setCart(newCart)
        },
        updateQuantity(productId, quantity) {
          let newCart
          if (quantity > 0) {
            newCart = cart.map((product) => {
              return product.productId === productId ? { ...product, quantity } : product
            })
          } else {
            newCart = cart.filter((product) => product.productId !== productId)
          }
          setCart(newCart)
        },
        getQuantity(productId) {
          if (!Array.isArray(cart)) return 0
          return (cart.find((p) => p.productId === productId) || {}).quantity || 0
        },
        removeFromCart() {},
        getCartSize() {
          console.log({cart})
          return cart.reduce((count, item) => count + item.quantity, 0)
        },
        getCartTotal() {
          return cart.reduce((price, item) => price + item.price, 0)
        },
        cart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCart() {
  return React.useContext(ShoppingCartContext)
}

interface ShoppingCartContextValue {
  addToCart(
    productId: CartProduct['productId'],
    name: CartProduct['name'],
    price: CartProduct['price'],
    quantity?: number
  ): void
  updateQuantity(productId: CartProduct['productId'], quantity: CartProduct['quantity']): void
  removeFromCart(productId: CartProduct['productId']): void
  getQuantity(productId: CartProduct['productId']): number
  getCartSize(): number
  getCartTotal(): number
  cart: CartProduct[]
}
