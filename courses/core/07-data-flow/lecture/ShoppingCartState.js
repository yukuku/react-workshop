import React, { useContext, useState } from 'react'

const ShoppingCartContext = React.createContext()

export function ShoppingCartProvider({ children }) {
  const [cart, setCart] = useState([])

  function addToCart(productId, name, price) {
    const newCart = cart.concat([{ productId, quantity: 1, name, price }])
    setCart(newCart)
  }

  function updateQuantity(productId, quantity) {
    let newCart
    if (quantity > 0) {
      newCart = cart.map(product => {
        return product.productId === productId ? { ...product, quantity } : product
      })
    } else {
      newCart = cart.filter(product => product.productId !== productId)
    }
    setCart(newCart)
  }

  function getQuantity(productId) {
    if (!Array.isArray(cart)) return 0
    return (cart.find(p => p.productId === productId) || {}).quantity || 0
  }

  const context = {
    cart,
    addToCart,
    updateQuantity,
    getQuantity
  }

  return <ShoppingCartContext.Provider value={context} children={children} />
}

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}
