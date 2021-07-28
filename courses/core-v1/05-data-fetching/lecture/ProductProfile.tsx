import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import Heading from 'YesterTech/Heading'
import Quantity from 'YesterTech/Quantity'
import Tiles from 'YesterTech/Tiles'
import StarRatings from 'YesterTech/StarRatings'
import ProductImage from 'YesterTech/ProductImage'
import ShoppingCartButton from 'YesterTech/ShoppingCartButton'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'
import ProductTile from 'YesterTech/ProductTile'
import { Product } from 'YesterTech/types'
import api from 'YesterTech/api'
import { any } from 'prop-types'

// https://twitter.com/dan_abramov/status/1313891773224189953

function useProduct__withAsyncAwait(productId: number) {
  let [product, setProduct] = React.useState<Product | null>(null)
  React.useEffect(() => {
    let isCurrentEffectCycle = true
    getProduct()
    async function getProduct() {
      let product = await api.products.getProduct(productId)
      if (isCurrentEffectCycle) {
        setProduct(product)
      }
    }
    return () => {
      isCurrentEffectCycle = false
    }
  }, [productId])

  return product
}

function useProduct(productId: number) {
  let [product, setProduct] = React.useState<Product | null>(null)
  React.useEffect(() => {
    let isCurrentEffectCycle = true
    api.products.getProduct(productId).then((data) => {
      if (isCurrentEffectCycle) {
        setProduct(data)
      }
    })
    return () => {
      isCurrentEffectCycle = false
    }
  }, [productId])

  return product
}

class ProductProfileClass extends React.Component<any, any, any> {
  state = {
    product: null,
  }

  mounted = false
  fetchCount = 0

  getProduct = () => {
    let productId = this.props.productId
    let currentFetchCount = ++this.fetchCount
    api.products.getProduct(productId).then((data) => {
      if (this.mounted && this.fetchCount === currentFetchCount) {
        this.setState({ product: data })
      }
    })
  }

  componentDidMount() {
    this.mounted = true
    this.getProduct()
  }

  componentDidUpdate(previousProps) {
    if (previousProps.productId !== this.props.productId) {
      this.getProduct()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    let product = this.state.product
    let { productId, addToCart, updateQuantity, getQuantity } = this.props
    let quantity = getQuantity(productId)

    if (!product) {
      return <div>Loading...</div>
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
            <Columns split>
              <Column>
                <div className="text-small">
                  <div>Brand: {product.brand}</div>
                  <div>Category: {product.category}</div>
                  <div>Condition: {product.condition}</div>
                </div>
              </Column>
              <Column className="spacing-small">
                <ShoppingCartButton
                  onClick={() => addToCart(productId, product.name, product.price)}
                  quantity={quantity}
                />

                {quantity > 0 && (
                  <div className="align-right">
                    <Quantity onChange={(q) => updateQuantity(productId, q)} quantity={quantity} />
                  </div>
                )}
              </Column>
            </Columns>
            <p>{product.description}</p>
          </Column>
        </Columns>
        {Array.isArray(product.relatedProducts) && (
          <>
            <hr />
            <div>
              <Heading as="h2" size={4}>
                Related Products
              </Heading>
              <Tiles>
                {product.relatedProducts.map((productId) => (
                  <ProductTile key={productId} productId={productId} />
                ))}
              </Tiles>
            </div>
          </>
        )}
      </div>
    )
  }
}

function ProductProfile() {
  let { productId } = useParams<{ productId: any }>()
  let { addToCart, updateQuantity, getQuantity } = useShoppingCart()

  productId = parseInt(productId, 10)

  //   React.useEffect(() => {}) // sync with ALL state changes
  //   React.useEffect(() => {}, []) // sync with NO state changes
  //   React.useEffect(() => {}, [sync, with, THIS, state])

  // Cart
  let quantity = getQuantity(productId)

  let product = useProduct(productId)

  if (!product) {
    return <div>Loading...</div>
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
          <Columns split>
            <Column>
              <div className="text-small">
                <div>Brand: {product.brand}</div>
                <div>Category: {product.category}</div>
                <div>Condition: {product.condition}</div>
              </div>
            </Column>
            <Column className="spacing-small">
              <ShoppingCartButton
                onClick={() => addToCart(productId, product.name, product.price)}
                quantity={quantity}
              />

              {quantity > 0 && (
                <div className="align-right">
                  <Quantity onChange={(q) => updateQuantity(productId, q)} quantity={quantity} />
                </div>
              )}
            </Column>
          </Columns>
          <p>{product.description}</p>
        </Column>
      </Columns>
      {Array.isArray(product.relatedProducts) && (
        <>
          <hr />
          <div>
            <Heading as="h2" size={4}>
              Related Products
            </Heading>
            <Tiles>
              {product.relatedProducts.map((productId) => (
                <ProductTile key={productId} productId={productId} />
              ))}
            </Tiles>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductProfile
