import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure'
import './styles.scss'

// Incase you want to test your onChange with icons
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

function App() {
  const [open, setOpen] = React.useState(false)

  return (
    <Disclosure onChange={setOpen} defaultOpen={open}>
      <DisclosureButton>{open ? <FaAngleDown /> : <FaAngleRight />}Click Me</DisclosureButton>
      <DisclosurePanel>Panel Info</DisclosurePanel>
    </Disclosure>
  )
}

// function App() {
//   return (
//     <Disclosure>
//       {({ open }) => {
//         return (
//           <>
//             <DisclosureButton>{open ? <FaAngleDown /> : <FaAngleRight />}Click Me</DisclosureButton>
//             <DisclosurePanel>Panel Info</DisclosurePanel>
//           </>
//         )
//       }}
//     </Disclosure>
//   )
// }

ReactDOM.render(<App />, document.getElementById('root'))
