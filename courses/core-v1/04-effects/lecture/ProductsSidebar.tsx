import { any } from 'prop-types'
import * as React from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

// FOR DEMONSTRATION OF RENDER PROPS
export class ProductsSidebarClass extends React.Component<any, any> {
  state = {
    isWide: false,
  }

  media = window.matchMedia(this.props.query)

  setupMatcher = () => {
    this.media.addEventListener('change', this.handleMediaChange)
  }

  cleanupMatcher = () => {
    this.media.removeEventListener('change', this.handleMediaChange)
  }

  handleMediaChange = (event) => {
    this.setState({ isWide: event.matches })
  }

  componentDidMount() {
    this.setupMatcher()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.cleanupMatcher()
      this.setupMatcher()
    }
  }

  componentWillUnmount() {
    this.cleanupMatcher()
  }

  render() {
    // @ts-ignore
    return this.props.children({ isWide: this.state.isWide })
  }
}

function ProductsSidebar() {
  let isWide = useMatchMedia('(min-width: 600px)')
  return isWide ? (
    <aside>
      <ProductFilters />
    </aside>
  ) : null
}

export function useMatchMedia(query: string) {
  let [isWide, setIsWide] = React.useState(false)
  React.useEffect(() => {
    let media = window.matchMedia(query)
    let handleMediaChange = (event) => {
      setIsWide(event.matches)
    }
    media.addEventListener('change', handleMediaChange)
    setIsWide(media.matches)

    return () => {
      media.removeEventListener('change', handleMediaChange)
    }
  }, [query])

  return isWide
}

export default ProductsSidebar
