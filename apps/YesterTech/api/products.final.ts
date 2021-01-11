import queryString from 'query-string'
import { TODO } from 'YesterTech/types'
import { get, getRaw } from './utils.final'

interface Product {
  category?: string
  brand?: string
  imagePath: string
  name: string
  id: string
  price: number
  year: string
  condition: string
  rating: number
}

interface ProductMetaData {
  categories: string[]
  brands: string[]
}

export async function getProducts(
  search: TODO = {},
  page = 1
): Promise<{
  products: Product[]
  totalResults: number
}> {
  // If setting up this search object seems a little weird, we're
  // just conforming to the funky API or JSON-Server
  search = {
    ...search,
    _limit: 10,
    _page: page,
    page: undefined,
    category: search.categories ? search.categories.split(',') : undefined,
    brand: search.brands ? search.brands.split(',') : undefined,
    condition: search.conditions ? search.conditions.split(',') : undefined,
  }

  const query = queryString.stringify(search || {})

  const res = await getRaw(`/products?${query}`)
  const products = await res.json()
  return {
    products,
    totalResults: parseInt(res.headers.get('x-total-count')!, 10),
  }
}

export function getProduct(productId: number): Promise<Product> {
  return get(`/products/${productId}`)
}

export function getMetaData(): Promise<ProductMetaData> {
  return get<Product[]>('/products').then((products) => {
    const categories = products.reduce<string[]>((c, p) => c.concat([p.category || '']), [])
    const brands = products.reduce<string[]>((b, p) => b.concat([p.brand || '']), [])

    return {
      categories: [...new Set(categories)],
      brands: [...new Set(brands)],
    }
  })
}
