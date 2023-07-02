import { VirtueType } from './virtue.type'

export type UserType = {
  id: string
  displayName: string
  publicTag: string
  virtues?: VirtueType[]
}
