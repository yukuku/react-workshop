import * as React from 'react'
import { Switch, Route, Link, Redirect, useParams } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'

import usePromise from 'YesterTech/usePromise'
import api from 'YesterTech/api'
import Logo from 'YesterTech/Logo'
import Heading from 'YesterTech/Heading'
import ProductImage from 'YesterTech/ProductImage'
import StarRatings from 'YesterTech/StarRatings'
import ProductFilterItem from 'YesterTech/ProductFilterItem'
import ProductSubNav from 'YesterTech/ProductSubNav'
import { Product } from 'YesterTech/types'

const PrimaryLayout = (): React.ReactElement => {
  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <ProductSubNav />
        <main className="primary-content">
          <Switch>
            <Route path="/products">
              <ProductsLayout />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Redirect to="/products" />
          </Switch>
        </main>
        <PrimaryFooter />
      </div>
    </div>
  )
}

function Error404() {
  return <h1>Oh noooooooooooo!</h1>
}

export default PrimaryLayout

function PrimaryHeader(): React.ReactElement {
  return (
    <header className="primary-header flex-parent flex-justify-space-between flex-align-center">
      <div>
        <Logo />
      </div>
      <nav className="horizontal-spacing-large align-right">
        <Link to="/" className="primary-nav-item">
          Home
        </Link>
        <Link to="/products" className="primary-nav-item">
          Products
        </Link>
      </nav>
    </header>
  )
}

function Home(): React.ReactElement {
  return (
    <div className="spacing">
      <Heading>Home Page</Heading>
    </div>
  )
}

function PrimaryFooter(): React.ReactElement {
  return (
    <footer className="primary-footer spacing">
      <hr />
      <div className="text-small">Copyright &copy; {new Date().getFullYear()} YesterTech Inc</div>
    </footer>
  )
}

function ProductsLayout(): React.ReactElement {
  return (
    <div className="products-layout">
      <aside className="spacing">
        <section className="spacing-small">
          <Heading size={3}>Categories</Heading>
          <ProductFilterItem item="computers">Computers</ProductFilterItem>
          <ProductFilterItem item="games">Games</ProductFilterItem>
          <ProductFilterItem item="music">Music</ProductFilterItem>
        </section>
      </aside>
      <div>
        <Route path="/products" exact>
          <BrowseProducts />
        </Route>
        <Route path="/products/:productId">
          <ProductProfile />
        </Route>
      </div>
    </div>
  )
}

function ProductProfile(): React.ReactElement {
  let { productId } = useParams<{ productId: string }>()

  let [product, setProduct] = React.useState<null | Product>(null)
  React.useEffect(() => {
    let isCurrent = true
    let productIdString = parseInt(productId, 10)
    api.products.getProduct(productIdString).then((product) => {
      if (isCurrent) {
        setProduct(product)
      }
    })
    return () => {
      isCurrent = false
    }
  }, [productId])

  if (productId == null) {
    return <h1>Sorry, no product found!</h1>
  }

  if (!product) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="spacing">
      <Columns gutters>
        <Column>
          <ProductImage src={product.imagePath} alt={product.name} size={15} />
        </Column>
        <Column flex className="spacing">
          <Heading>{product.name}</Heading>
          <StarRatings rating={product.rating} />
          <hr />
          <div className="text-small">
            <div>Brand: {product.brand}</div>
            <div>Category: {product.category}</div>
            <div>Condition: {product.condition}</div>
          </div>
        </Column>
      </Columns>
    </div>
  )
}

function BrowseProducts(): React.ReactElement {
  return (
    <div className="spacing">
      <ul>
        <li>
          <Link to="/products/1">Nintendo NES</Link>
        </li>
        <li>
          <Link to="/products/2">Donkey Kong Country</Link>
        </li>
        <li>
          <Link to="/products/3">Mario Kart</Link>
        </li>
      </ul>
    </div>
  )
}
