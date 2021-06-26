import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Select, Option } from './Select'
// import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import './styles.scss'

function App() {
  let ref = React.useRef()

  return (
    <div>
      <p>What is your favorite fruit?</p>

      <Select defaultValue="kiwi" ref={ref}>

          <Option
            className="apple"
            value="apple"
            onClick={(event) => {
              window.alert('Apples are not allowed!')
            }}
          >
            Apple
          </Option>
          <Option value="kiwi">Kiwi</Option>
          <Option value="banana">Banana</Option>
        </SelectList>
      </Select>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// This works OK but needs a lot more!
// - Support for proper labels for assistive technology
// - Proper keyboard event handling
// - More nuanced mouse/pointer event handling
