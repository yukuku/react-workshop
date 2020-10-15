import React, { useContext, useState, useEffect, useRef } from 'react'
// import * as storage from 'YesterTech/localStorage'

const Context = React.createContext()

export function FavoriteProductProvider({ children }) {
  return <Context.Provider value="message" children={children} />
}

export function useFavoriteProduct() {
  return useContext(Context)
}
