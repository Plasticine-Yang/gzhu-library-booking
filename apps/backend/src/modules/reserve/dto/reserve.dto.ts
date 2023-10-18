export interface ReserveDto {
  /** 数字广大用户名 */
  gzhuUsername: string

  /** 数字广大密码 */
  gzhuPassword: string

  /** 自动预约的时间 - 建议是 6:30 */
  reserveTime: string

  /** 预约表单 */
  reserveFormValues: ReserveFormValues

  /**
   * 提前多少分钟登录
   *
   * @default 3
   */
  loginAheadDuration?: number

  /**
   * 预约请求的并发量
   *
   * @default 5
   */
  concurrencyLevel?: number
}

export interface ReserveFormValues {
  /** 预约发起人的 id - 对应 appAccNo */
  appointmentInitiatorId: number

  /** 预约开始时间 - 对应 resvBeginTime */
  beginTime: string

  /** 预约结束时间 - 对应 resvEndTime */
  endTime: string

  /** 预约的设备 id，即房间或座位的 id - 对应 resvDev */
  deviceIdList: number[]

  /** 预约人的 id - 对应 resvMember */
  appointmentIdList: number[]
}
