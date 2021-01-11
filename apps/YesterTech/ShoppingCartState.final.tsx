import React, { useContext, useReducer, useEffect } from 'react'
import * as storage from 'YesterTech/localStorage.final'
import { CartItem } from './types'

interface ShoppingCartContextValue {
  addToCart(productId: string, name: string, price: number): void
  updateQuantity(
    productId: ShoppingCartUpdateEvent['productId'],
    quantity: ShoppingCartUpdateEvent['quantity']
  ): void
  removeFromCart(productId: ShoppingCartRemoveEvent['productId']): void
  getQuantity(productId: string): number
  getCartSize(): number
  getCartTotal(): number
  cart: CartItem[]
}

const ShoppingCartContext = React.createContext<ShoppingCartContextValue>(null as any)

interface ShoppingCartState {
  cart: CartItem[]
}

const initialShoppingCartState: ShoppingCartState = {
  cart: storage.getCart() || [],
}

interface ShoppingCartAddEvent {
  type: 'ADD'
  productId: string
  name?: string
  price?: number
}

interface ShoppingCartUpdateEvent {
  type: 'UPDATE'
  productId: string
  quantity: number
}

interface ShoppingCartRemoveEvent {
  type: 'REMOVE'
  productId: string
}

type ShoppingCartEvent = ShoppingCartAddEvent | ShoppingCartUpdateEvent | ShoppingCartRemoveEvent

const shoppingCartReducer = (
  state: ShoppingCartState,
  action: ShoppingCartEvent
): ShoppingCartState => {
  switch (action.type) {
    case 'ADD': {
      const found = state.cart.find((p) => p.productId === parseInt(action.productId, 10))
      if (!found) {
        return {
          ...state,
          cart: state.cart.concat({
            productId: parseInt(action.productId, 10),
            quantity: 1,
            name: action.name || '',
            price: action.price || 0,
          }),
        }
      } else {
        return state
      }
    }
    case 'UPDATE': {
      let cart
      const quantity = parseInt(action.quantity + '', 10)
      if (quantity > 0) {
        cart = state.cart.map((product) => {
          return product.productId === parseInt(action.productId, 10)
            ? { ...product, quantity }
            : product
        })
      } else {
        cart = state.cart.filter((product) => product.productId !== parseInt(action.productId, 10))
      }
      return { ...state, cart }
    }
    case 'REMOVE': {
      const c = state.cart
      const index = c.findIndex((p) => p.productId === parseInt(action.productId, 10))
      const updatedCart = [...c.slice(0, index), ...c.slice(index + 1)]
      return { ...state, cart: updatedCart }
    }
    default:
      return state
  }
}

export const ShoppingCartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, initialShoppingCartState)

  const value = {
    ...state,
    addToCart(productId: string, name: string, price: number) {
      dispatch({ type: 'ADD', productId, name, price })
    },
    updateQuantity(productId: ShoppingCartUpdateEvent['productId'], quantity: number) {
      dispatch({ type: 'UPDATE', productId, quantity })
    },
    removeFromCart(productId: ShoppingCartRemoveEvent['productId']) {
      dispatch({ type: 'REMOVE', productId })
    },
    getQuantity(productId: string) {
      if (!Array.isArray(state.cart)) return 0
      return (
        (state.cart.filter((p) => p.productId === parseInt(productId, 10))[0] || {}).quantity || 0
      )
    },
    getCartSize() {
      if (!Array.isArray(state.cart)) return 0
      return state.cart.reduce((size, item) => size + item.quantity, 0)
    },
    getCartTotal() {
      if (!Array.isArray(state.cart)) return 0
      return state.cart.reduce((total, item) => total + item.quantity * item.price, 0)
    },
  }

  return <ShoppingCartContext.Provider value={value} children={children} />
}

export function useShoppingCart() {
  const cartState = useContext(ShoppingCartContext)

  useEffect(() => {
    storage.updateCart(cartState.cart)
  }, [cartState.cart])

  return cartState
}
