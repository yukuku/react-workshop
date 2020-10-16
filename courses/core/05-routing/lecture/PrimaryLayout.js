import React from 'react'
import { Switch, Route, Link, Redirect, useRouteMatch, useParams } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'

import Logo from 'YesterTech/Logo'
import Heading from 'YesterTech/Heading'
import ProductImage from 'YesterTech/ProductImage'
import StarRatings from 'YesterTech/StarRatings'
import ProductFilterItem from 'YesterTech/ProductFilterItem'
import ProductSubNav from 'YesterTech/ProductSubNav'

// After we implement the fake versions of these below, we can swap them out for these real ones:
// import ProductsSidebar from 'YesterTech/ProductsSidebar'
// import BrowseProducts from 'YesterTech/BrowseProducts'
// import ProductProfile from 'YesterTech/ProductProfile'

export default function PrimaryLayout() {
  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <ProductSubNav />
        <main className="primary-content">
          <Switch>
            <Route path="/" exact element={<Home />} />
            <Route path="/products" element={<ProductsLayout />}>
              <Route path="/" exact element={<BrowseProducts />} />
              <Route path="/:productId" element={<ProductProfile />} />
            </Route>
          </Switch>
        </main>
        <footer className="primary-footer spacing">
          <hr />
          <div className="text-small">
            Copyright &copy; {new Date().getFullYear()} YesterTech Inc
          </div>
        </footer>
      </div>
    </div>
  )
}

function PrimaryHeader() {
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

function Home() {
  return (
    <div className="spacing">
      <Heading>Home Page</Heading>
    </div>
  )
}

function ProductsLayout() {
  return (
    <div className="products-layout">
      <aside className="spacing">
        <section className="spacing-small">
          <Heading size={3}>Categories</Heading>
          <ProductFilterItem>Computers</ProductFilterItem>
          <ProductFilterItem>Games</ProductFilterItem>
          <ProductFilterItem>Music</ProductFilterItem>
        </section>
      </aside>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

function ProductProfile() {
  const { productId } = useParams()

  return (
    <div className="spacing">
      <Columns gutters>
        <Column>
          <ProductImage src="/images/products/mario-kart.jpg" alt="Mario Kart" size={15} />
        </Column>
        <Column flex className="spacing">
          <Heading>Mario Kart</Heading>
          <StarRatings rating={4.5} />
          <hr />
          <div className="text-small">
            <div>Brand: Nintendo</div>
            <div>Category: Games</div>
            <div>Condition: Good</div>
          </div>
        </Column>
      </Columns>
    </div>
  )
}

function BrowseProducts() {
  return (
    <div className="spacing">
      <ul>
        <li>
          <a href="/products/1">Nintendo NES</a>
        </li>
        <li>
          <a href="/products/2">Donkey Kong Country</a>
        </li>
        <li>
          <a href="/products/3">Mario Kart</a>
        </li>
      </ul>
    </div>
  )
}
