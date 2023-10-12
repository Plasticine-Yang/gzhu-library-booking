export type RoomMenu = RoomMenuItem[]

export interface RoomMenuItem {
  children: RoomMenuItemChild[]
  id: number
  name: string
  spanDay: boolean
}

export interface RoomMenuItemChild {
  id: number
  name: string
  spanDay: boolean
}
