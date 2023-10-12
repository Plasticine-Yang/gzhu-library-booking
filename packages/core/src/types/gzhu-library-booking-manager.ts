import type {
  GetMemberInfoRequestBody,
  GetRoomListRequestBody,
  MemberInfo,
  ReserveRequestBody,
  RoomList,
  RoomMenu,
  SeatMenu,
} from './DTO'
import { MemberInfoList } from './DTO'
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

  /** 获取人员信息列表 */
  getMemberInfoList(requestBody: GetMemberInfoRequestBody): Promise<MemberInfoList>

  /** 获取人员信息 - 是对 getMemberInfoList 的简化，取出第一个元素返回，建议使用学号进行搜索确保唯一性 */
  getMemberInfo(key: string): Promise<MemberInfo | null>

  /** 预约 */
  reserve(requestBody: ReserveRequestBody): Promise<null>
}

export interface GZHULibraryBookingManagerOptions {}
