export type TODO = any
// export type TODO = never

export type UserData = { username: string; name: string; password?: string; avatarUrl: string }

export interface EventObject {
  type: string
}
