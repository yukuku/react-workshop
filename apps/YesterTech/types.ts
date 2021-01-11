export type TODO = any
// export type TODO = never

export type UserData = { username: string; name: string; password?: string; avatarUrl: string }

export type CartItem = {
  productId: number
  quantity: number
  name: string
  price: number
}

export type Cart = CartItem[]

export interface EventObject {
  type: string
}
