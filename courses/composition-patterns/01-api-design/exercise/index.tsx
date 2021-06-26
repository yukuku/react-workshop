import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure'
import './styles.scss'

// Create a reusable component for a generic Disclosure component.
// This is just giving you the starting DOM structure and basic functionality
// you're aiming for.

/*

<Disclosure>
    <DisclosureButton>Details</DisclosureButton>
    <DisclosurePanel>
        Something small enough to escape casual notice.
    </DisclosurePanel>
</Disclosure>

*/

function App() {
  return (
    <div className="App">
      <Disclosure>
        <DisclosureButton className="red">I just want to tell you how I'm feeling</DisclosureButton>
        <DisclosurePanel>
          <blockquote>
            <p>
              Never gonna give you up. Never gonna let you down. Never gonna run around and desert
              you.
            </p>
            <p>
              Never gonna make you cry. Never gonna say goodbye. Never gonna tell a lie and hurt you
            </p>
            <cite>Richard Paul Astley</cite>
          </blockquote>
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
