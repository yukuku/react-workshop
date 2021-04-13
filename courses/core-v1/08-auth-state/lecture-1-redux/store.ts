import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'
import { authReducer } from './AuthState'
import { cartReducer } from './ShoppingCartState'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

function useRootDispatch() {
  return useDispatch<RootDispatch>()
}

function useAppSelector<Selected>(
  selector: (state: RootState) => Selected,
  equalityFn?: (left: Selected, right: Selected) => boolean
) {
  return useSelector(selector, equalityFn)
}

type RootState = ReturnType<typeof store.getState>
type RootDispatch = typeof store.dispatch

export type { RootDispatch, RootState }
export { store, useRootDispatch as useDispatch, useAppSelector as useSelector }

export default store
