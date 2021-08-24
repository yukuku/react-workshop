import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './styles.scss'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorState {
  error: null | Error
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorState, ErrorState> {
  state = {
    error: null,
  }

  public static getDerivedStateFromError(error: Error): ErrorState {
    return { error }
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log({ error, info })
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Uh oh!</h1>
          <p>Something went wrong!</p>
        </div>
      )
    }
    return <>{this.props.children}</>
  }
}

function App() {
  return (
    <div className="spacing">
      <p>Go wild with it!</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
