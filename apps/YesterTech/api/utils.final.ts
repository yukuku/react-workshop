// Database API served by `json-server`
const baseURL = 'http://localhost:3333'

export function get<T>(path: string): Promise<T> {
  return fetch(`${baseURL}${path}`).then((res) => res.json())
}

export function getRaw(path: string) {
  return fetch(`${baseURL}${path}`)
}

export function post<TResponse>(path: string, data: any): Promise<TResponse> {
  return fetch(`${baseURL}${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}
