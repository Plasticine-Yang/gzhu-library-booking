import { ApiCodeDescription, ApiCodeNamespace } from '../decorators'

@ApiCodeNamespace('reserve', '预约模块')
export class ReserveModuleApiCode {
  @ApiCodeDescription('预约失败')
  static ReserveFailed = 4000

  @ApiCodeDescription('自动预约时间解析失败')
  static ParseReserveTimeFailed = 4001

  @ApiCodeDescription('提前登录失败')
  static LoginAheadFailed = 4002
}
