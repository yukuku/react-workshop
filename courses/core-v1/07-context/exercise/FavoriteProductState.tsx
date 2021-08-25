/* eslint-disable no-unused-vars */
import * as React from 'react'
import * as storage from 'YesterTech/localStorage'

// 1. In the provider, import the `storage` object which is commented out.
// 2. Create a `React.useEffect` which runs every time the `favorites` change.
// 3. The `storage` has two methods:

// Make your context here
const FavoriteProductContext = React.createContext<FavoriteProductContextValue | null>(null)

export const FavoriteProductProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = React.useState<number[]>(() => {
    return storage.getFavorites() || []
  })

  useUpdateEffect(() => {
    storage.updateFavorites(favorites)
  }, [favorites])

  return (
    // Wrap children in the provider instead of the Fragment
    <FavoriteProductContext.Provider
      value={{
        isFavorite(productId) {
          return favorites.includes(productId)
        },
        addFavorite(productId) {
          setFavorites((favorites) => favorites.concat([productId]))
        },
        removeFavorite(productId) {
          setFavorites((favorites) => favorites.filter((id) => id !== productId))
        },
      }}
    >
      {children}
    </FavoriteProductContext.Provider>
  )
}

export function useFavoriteProduct() {
  let context = React.useContext(FavoriteProductContext)
  if (!context) {
    throw Error('It looks like you tried to use FavoriteProductContext outside of its provider.')
  }
  return context
}

interface FavoriteProductContextValue {
  isFavorite(productId: number): boolean
  addFavorite(productId: number): void
  removeFavorite(productId: number): void
}

function useUpdateEffect(fn: React.EffectCallback, dependencyArray?: React.DependencyList) {
  let isFirstRender = React.useRef(true)
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      return fn()
    }
  }, dependencyArray)
}
