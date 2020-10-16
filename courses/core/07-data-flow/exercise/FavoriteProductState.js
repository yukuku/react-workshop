import React, { useContext, useState, useEffect, useRef } from 'react'
import * as storage from 'YesterTech/localStorage'

const Context = React.createContext()

export function FavoriteProductProvider({ children }) {
  const [favorites, setFavorites] = useState(() => storage.getFavorites())
  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (!firstRenderRef.current) {
      console.log('this should only run on updates')
      storage.updateFavorites(favorites)
    }
    firstRenderRef.current = false
  }, [favorites])

  const context = {
    isFavorite: function(productId) {
      return favorites.includes(productId)
    },
    addFavorite: function(productId) {
      setFavorites(favorites.concat([productId]))
    },
    removeFavorite: function(productId) {
      setFavorites(favorites.filter(id => id !== productId))
    }
  }

  return <Context.Provider value={context}>{children}</Context.Provider>
}

export function useFavoriteProduct() {
  return useContext(Context)
}
