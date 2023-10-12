export interface ReserveRequestBody {
  /** 预约发起人的 id - 可通过 getMember 接口获取 accNo 作为该参数 */
  appAccNo: number

  /** 预约人的 id - 可通过 getMember 接口获取 accNo 作为该参数 */
  resvMember: number[]

  /** 预约的房间 devId */
  resvDev: number[]

  /** 开始时间 - 格式：`2023-10-14 08:30:00` */
  resvBeginTime: string

  /** 结束时间 - 格式：`2023-10-14 08:30:00` */
  resvEndTime: string

  /**
   * @default []
   */
  addServices?: string[]

  /**
   * @default ""
   */
  appUrl?: string

  /**
   * @default ""
   */
  captcha?: string

  /**
   * @default 1
   */
  memberKind?: number

  /**
   * 申请理由
   *
   * @default ""
   */
  memo?: string

  /**
   * @default 2
   */
  resvKind?: number

  /**
   * @default 0
   */
  resvProperty?: number

  /**
   * @default 1
   */
  sysKind?: number

  /**
   * 预约的主题
   *
   * @default ""
   */
  testName?: string
}
