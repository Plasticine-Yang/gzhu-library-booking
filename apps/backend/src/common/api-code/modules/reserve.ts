import { ApiCodeDescription, ApiCodeNamespace } from '../decorators'

@ApiCodeNamespace('reserve', '预约模块')
export class ReserveModuleApiCode {
  @ApiCodeDescription('预约失败')
  static ReserveFailed = 4000

  @ApiCodeDescription('自动预约时间解析失败')
  static ParseReserveTimeFailed = 4001

  @ApiCodeDescription('提前登录失败')
  static LoginAheadFailed = 4002

  @ApiCodeDescription('根据学号查询预约人的 id 失败')
  static GetAppointmentInitiatorIdFailed = 4003

  @ApiCodeDescription('根据学号查询预约人的 id 失败')
  static GetAppointmentIdListFailed = 4004

  @ApiCodeDescription('预约定时任务已存在')
  static ReserveCronJobExist = 4005

  @ApiCodeDescription('预约记录已存在')
  static ReserveRecordDuplicated = 4006

  @ApiCodeDescription('预约记录不存在')
  static ReserveRecordNotExist = 4007

  @ApiCodeDescription('不可启用不属于自己的定时任务')
  static CanNotEnableCronJobMismatchUserId = 4008
}
