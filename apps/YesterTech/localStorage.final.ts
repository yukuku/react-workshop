/**
 * Auth
 */

import { Cart, TODO, UserData } from './types'

const LOCAL_STORAGE_KEY_AUTH = 'reacttraining-workshop-auth'

export function login(user: UserData) {
  localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, JSON.stringify(user))
}

export function logout() {
  localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH)
}

export function getAuthenticatedUser(): UserData | undefined {
  try {
    const localStorageUser = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH)
    if (!localStorageUser) return
    return JSON.parse(localStorageUser)
  } catch (e) {
    return
  }
}

/**
 * Cart
 */

const LOCAL_STORAGE_KEY_CART = 'reacttraining-workshop-cart'

export function updateCart(cart: Cart) {
  localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(cart))
}

export function getCart(): Cart | undefined {
  try {
    const cart = localStorage.getItem(LOCAL_STORAGE_KEY_CART)
    if (!cart) return
    return JSON.parse(cart)
  } catch (e) {
    return
  }
}

/**
 * Favorites
 */

const LOCAL_STORAGE_KEY_FAVORITES = 'reacttraining-workshop-favorites'

export function updateFavorites(favorites: TODO) {
  localStorage.setItem(LOCAL_STORAGE_KEY_FAVORITES, JSON.stringify(favorites))
}

export function getFavorites() {
  try {
    const favorites = localStorage.getItem(LOCAL_STORAGE_KEY_FAVORITES)
    if (!favorites) return []
    return JSON.parse(favorites)
  } catch (e) {
    return
  }
}
