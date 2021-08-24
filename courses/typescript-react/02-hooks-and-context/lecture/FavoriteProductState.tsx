import * as React from 'react'
import * as storage from 'YesterTech/localStorage'

function createContext<T>(initialValue?: T) {
  let context = React.createContext<T | null>(initialValue || null)
  function useCtx() {
    let contextValue = React.useContext(context)
    if (!contextValue) {
      throw Error('It looks like you used FavoriteProductContext outside of its provider.')
    }
    return contextValue
  }

  return [context.Provider, useCtx] as const
}

const [AuthProvider, useAuthContext] =
  createContext<{
    user: { username: string }
  }>()

const FavoriteProductContext = React.createContext<FavoriteProductContextValue | null>(null)

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>

interface ChilProps {
  setState: StateSetter<number[]>
}

export const FavoriteProductProvider = ({ children }) => {
  const firstRenderRef = React.useRef(true)
  const [favorites, setFavorites] = useFavoriteState()

  React.useEffect(() => {
    if (!firstRenderRef.current) {
      storage.updateFavorites(favorites)
    }
    firstRenderRef.current = false
  }, [favorites])

  const value: FavoriteProductContextValue = {
    isFavorite(productId) {
      return favorites.includes(productId)
    },
    addFavorite(productId) {
      setFavorites((favorites) => favorites.concat(productId))
    },
    removeFavorite(productId) {
      setFavorites((favorites) => favorites.filter((id) => id !== productId))
    },
  }

  return (
    <FavoriteProductContext.Provider value={value}>
      <div>{children}</div>
    </FavoriteProductContext.Provider>
  )
}

export function useFavoriteProduct() {
  let contextValue = React.useContext(FavoriteProductContext)
  if (!contextValue) {
    throw Error('It looks like you used FavoriteProductContext outside of its provider.')
  }
  return contextValue
}

function useFavoriteState() {
  const [favorites, setFavorites] = React.useState(() => {
    return storage.getFavorites()
  })
  return [favorites, setFavorites] as const
}

interface FavoriteProductContextValue {
  isFavorite(productId: number): boolean
  addFavorite(productId: number): void
  removeFavorite(productId: number): void
}
