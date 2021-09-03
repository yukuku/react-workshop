import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

function Link({ className }) {
  return (
    <a href="#" className={className}>
      Link
    </a>
  )
}

const StyledLink = styled(Link)`
  background-color: ${(props) => props.color};
  color: white;
`

function App() {
  const color = 'blue'

  return (
    <div>
      <StyledLink color={color}></StyledLink>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
