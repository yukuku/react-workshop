import { UserData } from 'YesterTech/types'
import { post } from './utils'

export function registerUser(data: UserData) {
  return post(`/users`, data)
}
