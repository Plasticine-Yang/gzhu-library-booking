import type { GetRoomListRequestBody, ReserveRequestBody, RoomList, RoomMenu, SeatMenu } from './DTO'
import type { LoginResult } from './login'

export interface GZHULibraryBookingManager {
  /** 登录 */
  login(username: string, password: string): Promise<LoginResult>

  /** 设置登陆成功的 cookie 值，可以用于读取到缓存的 cookie 时更新，从而避免登录 */
  setLoginSuccessCookieValue(cookieValue: string): void

  /** 获取房间菜单 */
  getRoomMenu(): Promise<RoomMenu>

  /** 获取座位菜单 */
  getSeatMenu(): Promise<SeatMenu>

  /** 获取房间列表 */
  getRoomList(requestBody: GetRoomListRequestBody): Promise<RoomList>

  /** 预约 */
  reserve(requestBody: ReserveRequestBody): Promise<null>
}

export interface GZHULibraryBookingManagerOptions {}
