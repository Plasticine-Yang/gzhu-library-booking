export type SeatMenu = SeatMenuItem[]

export interface SeatMenuItem {
  children: SeatMenuItemChild[]
  id: number
  name: string
  remainCount: number
  spanDay: boolean
  totalCount: number
}

export interface SeatMenuItemChild {
  children: Omit<SeatMenuItemChild, 'children'>[]
  id: number
  name: string
  remainCount: number
  spanDay: boolean
  totalCount: number
}
