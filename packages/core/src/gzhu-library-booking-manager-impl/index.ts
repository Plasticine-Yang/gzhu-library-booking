import {
  GET_MEMBER_INFO_LIST_URL,
  GET_ROOM_LIST_URL,
  GET_ROOM_MENU_URL,
  GET_SEAT_MENU_URL,
  RESERVE_URL,
} from '@/constants'
import { RequestInstance } from '@/helpers'
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
  private request: RequestInstance

  constructor(private options?: GZHULibraryBookingManagerOptions) {
    this.request = new RequestInstance()
  }

  public async login(username: string, password: string): Promise<LoginResult> {
    this.options
    const loginResult = await internalLogin(username, password)

    return loginResult
  }

  public setLoginSuccessCookieValue(cookieValue: string): void {
    this.request.setLoginSuccessCookieValue(cookieValue)
  }

  public async getRoomMenu(): Promise<RoomMenu> {
    const response = await this.request.get<CommonResponse<RoomMenu>>(GET_ROOM_MENU_URL)

    return response.data.data
  }

  public async getSeatMenu(): Promise<SeatMenu> {
    const response = await this.request.get<CommonResponse<SeatMenu>>(GET_SEAT_MENU_URL)

    return response.data.data
  }

  public async getRoomList(requestBody: GetRoomListRequestBody): Promise<RoomList> {
    const response = await this.request.get<CommonResponse<RoomList>>(GET_ROOM_LIST_URL, { params: requestBody })

    return response.data.data
  }

  public async getMemberInfoList(requestBody: Partial<GetMemberInfoRequestBody>): Promise<MemberInfoList> {
    const response = await this.request.get<CommonResponse<MemberInfoList>>(GET_MEMBER_INFO_LIST_URL, {
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
    const response = await this.request.post<CommonResponse<null>>(RESERVE_URL, {
      appAccNo: requestBody.appAccNo,
      resvMember: requestBody.resvMember,
      resvDev: requestBody.resvDev,
      resvBeginTime: requestBody.resvBeginTime,
      resvEndTime: requestBody.resvEndTime,
      addServices: requestBody.addServices ?? [],
      appUrl: requestBody.appUrl ?? '',
      captcha: requestBody.captcha ?? '',
      memberKind: requestBody.memberKind ?? 1,
      memo: requestBody.memo ?? '',
      resvKind: requestBody.resvKind ?? 2,
      resvProperty: requestBody.resvProperty ?? 0,
      sysKind: requestBody.sysKind ?? 1,
      testName: requestBody.testName ?? '学习',
    } as ReserveRequestBody)

    return response.data.data
  }
}

export { GZHULibraryBookingManagerImpl }
