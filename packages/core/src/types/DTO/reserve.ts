export interface ReserveRequestBody {
  /** 可为空数组 */
  addServices: string[]

  /** 预约发起人的 id - 可通过 getMember 接口获取 memberId 作为该参数 */
  appAccNo: number

  /** 可为空字符串 */
  appUrl: string

  /** 可为空字符串 */
  captcha: string

  /** 使用 1 */
  memberKind: number

  /** 申请理由 - 可为空字符串 */
  memo: string

  /** 开始时间 - 格式：`2023-10-14 08:30:00` */
  resvBeginTime: string

  /** 预约的房间 devId */
  resvDev: number[]

  /** 结束时间 - 格式：`2023-10-14 08:30:00` */
  resvEndTime: string

  /** 使用 2 */
  resvKind: number

  /** 预约人的 id - 可通过 getMember 接口获取 memberId 作为该参数 */
  resvMember: number[]

  /** 使用 0 */
  resvProperty: number

  /** 使用 1 */
  sysKind: number

  /** 预约的主题 */
  testName: string
}
