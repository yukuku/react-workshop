import React from 'react'

const QuantityContext = React.createContext()

function App() {
  const [quantity, setQuantity] = useState(0)

  return (
    <QuantityContext.Provider value={{ quantity, setQuantity }}>
      <Layout></Layout>
    </QuantityContext.Provider>
  )
}

function Layout() {
  return <Quantity></Quantity>
}

function Quantity() {
  const { quantity, setQuantity } = useContext(QuantityContext)

  return (
    <div>
      {quantity}
      <button></button>
      <Other></Other>
    </div>
  )
}

function Other() {}
