export interface Account {
  name: string
  password: string
}

export interface DataType<T = any> {
  code: string
  data: T
}

export interface LoginResult {
  id: number
  name: string
  token: string
}
