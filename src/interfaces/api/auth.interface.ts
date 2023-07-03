export interface LoginInterface {
  publicTag: string
  password: string
}

export interface LoginResponseInterface {
  accessToken: string
  id: string
  displayName: string
  publicTag: string
}

export interface RegisterInterface {
  publicTag: string
  password: string
  displayName: string
}

export interface RegisterResponseInterface {
  accessToken: string
  id: string
}

export interface UpdateUserResponseInterface {
  publicTag: string
  displayName: string
  id: string
}

export interface UpdateUserPayloadInterface {
  publicTag?: string
  password?: string
  displayName?: string
}
