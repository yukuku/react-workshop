import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthStateProvider } from 'YesterTech/AuthState'
import { ShoppingCartProvider } from 'YesterTech/ShoppingCartState'
import { FavoriteProductProvider } from 'YesterTech/FavoriteProductState'
import PrimaryLayout from 'YesterTech/PrimaryLayout'
import { Provider } from 'react-redux'
import store from './store'
import 'YesterTech/styles/global-styles.scss'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <FavoriteProductProvider>
          <PrimaryLayout />
        </FavoriteProductProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
