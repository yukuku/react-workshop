/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect, useRef } from 'react'
import * as storage from 'YesterTech/localStorage'

const Context = React.createContext()

export function FavoriteProductProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    return storage.getFavorites()
  })

  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (!firstRenderRef.current) {
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

  return <Context.Provider children={children} value={context} />
}

export function useFavoriteProduct() {
  return useContext(Context)
}
