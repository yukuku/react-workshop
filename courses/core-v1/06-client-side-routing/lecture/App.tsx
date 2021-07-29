import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from 'YesterTech/ShoppingCartState'
import { AuthStateProvider } from 'YesterTech/AuthState'
import PrimaryLayout from 'YesterTech/PrimaryLayout'

import 'YesterTech/styles/global-styles.scss'
import 'YesterTech/PrimaryLayout.scss'
import 'YesterTech/PrimaryHeader.scss'
import 'YesterTech/PrimaryFooter.scss'
import 'YesterTech/ProductsLayout.scss'

function App() {
  return (
    <BrowserRouter>
      <AuthStateProvider>
        <ShoppingCartProvider>
          <PrimaryLayout />
        </ShoppingCartProvider>
      </AuthStateProvider>
    </BrowserRouter>
  )
}

export default App
