import { UserData } from 'YesterTech/types'
import { post } from './utils.final'

export function registerUser(data: UserData) {
  return post(`/users`, data)
}
