import { get } from './utils'
import * as storage from 'YesterTech/localStorage.final'
import { TODO, UserData } from 'YesterTech/types'

function assertUser(user: any): asserts user is UserData {
  if (!('username' in user)) {
    throw new Error(`Invalid user data: ${JSON.stringify(user)}`)
  }
}

// We use local storage to simulate the fact that these promise-based
// function calls would really be talking to a server that would probably
// set a session or JWT

export function login(username: string, password: string): Promise<UserData> {
  return get(`/users?username=${username}&password=${password}`).then((results) => {
    if (results.length > 0) {
      const user = results[0]
      assertUser(user)
      delete user.password
      storage.login(user)
      return user
    } else {
      return Promise.reject('User not found')
    }
  })
}

export function getAuthenticatedUser(): Promise<UserData | undefined> {
  // In real life this would talk to the server
  const user = storage.getAuthenticatedUser()
  return Promise.resolve(user)
}

export function logout(): Promise<void> {
  // In real life this would talk to the server
  storage.logout()
  return Promise.resolve()
}

export function getGitHubUser(username: string): TODO {
  return fetch(`https://api.github.com/users/${username}`).then((res) => res.json())
}
