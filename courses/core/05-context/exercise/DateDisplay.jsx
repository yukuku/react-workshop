import { createContext, useContext } from 'react'
import dayjs from 'dayjs'

// 1. Create a Context
const DateContext = createContext()

export function DateDisplay({ children, date = '' }) {
  const context = {
    date: dayjs(date || new Date()),
  }

  // 2. Use the context variable to create a provider around the children
  return (
    <DateContext.Provider value={context}>
      {children}
    </DateContext.Provider>
  )
}

export function DateYear({ format = 'YYYY' }) {
  // 3. (for this and all components below):
  //    consume the context with useContext
  const { date } = useContext(DateContext)
  return <>{date.format(format)}</>
}

export function DateMonth({ format = 'MM' }) {
  // 3. Consume context
  const { date } = useContext(DateContext)
  return <>{date.format(format)}</>
}

export function DateDay({ format = 'DD' }) {
  // 3. Consume context
  const { date } = useContext(DateContext)
  return <>{date.format(format)}</>
}
