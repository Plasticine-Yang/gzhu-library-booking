import { GET_ROOM_MENU_URL, GET_SEAT_MENU_URL } from '@/constants'
import { request } from '@/helpers'
import type {
  CommonResponse,
  GZHULibraryBookingManager,
  GZHULibraryBookingManagerOptions,
  LoginResult,
  RoomMenu,
  SeatMenu,
} from '@/types'

import { internalLogin } from './login'

class GZHULibraryBookingManagerImpl implements GZHULibraryBookingManager {
  constructor(private options?: GZHULibraryBookingManagerOptions) {}

  public async login(username: string, password: string): Promise<LoginResult> {
    this.options
    const loginResult = await internalLogin(username, password)
    request.setLoginSuccessCookieValue(loginResult.cookieValue)

    return loginResult
  }

  public setLoginSuccessCookieValue(cookieValue: string): void {
    request.setLoginSuccessCookieValue(cookieValue)
  }

  public async getRoomMenu(): Promise<RoomMenu> {
    const response = await request.get<CommonResponse<RoomMenu>>(GET_ROOM_MENU_URL)

    return response.data.data
  }

  public async getSeatMenu(): Promise<SeatMenu> {
    const response = await request.get<CommonResponse<SeatMenu>>(GET_SEAT_MENU_URL)

    return response.data.data
  }
}

export { GZHULibraryBookingManagerImpl }
