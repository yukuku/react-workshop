import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import PrimaryLayout from './PrimaryLayout'
import { ShoppingCartProvider } from './ShoppingCartState'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Providers({ children }) {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>{children}</ShoppingCartProvider>
    </BrowserRouter>
  )
}

function App() {
  return (
    <Providers>
      <PrimaryLayout />
    </Providers>
  )
}

export default App
