import {
  GET_MEMBER_INFO_LIST_URL,
  GET_ROOM_LIST_URL,
  GET_ROOM_MENU_URL,
  GET_SEAT_MENU_URL,
  RESERVE_URL,
} from '@/constants'
import { request } from '@/helpers'
import type {
  CommonResponse,
  GZHULibraryBookingManager,
  GZHULibraryBookingManagerOptions,
  GetMemberInfoRequestBody,
  GetRoomListRequestBody,
  LoginResult,
  MemberInfo,
  MemberInfoList,
  ReserveRequestBody,
  RoomList,
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

  public async getRoomList(requestBody: GetRoomListRequestBody): Promise<RoomList> {
    const response = await request.get<CommonResponse<RoomList>>(GET_ROOM_LIST_URL, { params: requestBody })

    return response.data.data
  }

  public async getMemberInfoList(requestBody: Partial<GetMemberInfoRequestBody>): Promise<MemberInfoList> {
    const response = await request.get<CommonResponse<MemberInfoList>>(GET_MEMBER_INFO_LIST_URL, {
      params: {
        key: requestBody.key,
        page: requestBody.page ?? 1,
        pageNum: requestBody.pageNum ?? 20,
      } as GetMemberInfoRequestBody,
    })

    return response.data.data
  }

  public async getMemberInfo(key: string): Promise<MemberInfo | null> {
    const memberInfoList = await this.getMemberInfoList({ key })
    const targetMember = memberInfoList.at(0)

    return targetMember ?? null
  }

  public async reserve(requestBody: ReserveRequestBody): Promise<null> {
    const response = await request.post<CommonResponse<null>>(RESERVE_URL, requestBody)

    return response.data.data
  }
}

export { GZHULibraryBookingManagerImpl }
