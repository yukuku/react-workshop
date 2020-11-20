import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import PrimaryLayout from './PrimaryLayout'
import { ShoppingCartProvider } from './ShoppingCartState'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function App() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <PrimaryLayout />
      </ShoppingCartProvider>
    </BrowserRouter>
  )
}

export default App
