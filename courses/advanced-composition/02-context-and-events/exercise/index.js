import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure.final'
import './styles.scss'

// Incase you want to test your onChange with icons
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

function App() {
  return (
    <Disclosure>
      <DisclosureButton>
        {({ isOpen }) => {
          return (
            <>
              {isOpen ? <FaAngleRight /> : <FaAngleDown />}
              <span>Click Me</span>
            </>
          )
        }}
      </DisclosureButton>
      <DisclosurePanel>Panel Info</DisclosurePanel>
    </Disclosure>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
