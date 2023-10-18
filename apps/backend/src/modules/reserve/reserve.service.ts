import { GZHULibraryBookingManagerImpl } from '@gzhu-library-booking/core'
import { Injectable } from '@nestjs/common'

import { ReserveDto } from './dto/reserve.dto'
import { ReserveCronJobService } from './reserve-cronjob.service'

@Injectable()
export class ReserveService {
  constructor(private reserveCronJobService: ReserveCronJobService) {}

  /**
   * 为当前用户添加一个定时任务
   *
   * 1. 在指定时间的前 n 分钟登录到图书馆预约系统
   * 2. 在指定时间发起预约请求 - 支持配置并发量，提高成功率
   */
  async reserve(userId: number, reserveDto: ReserveDto) {
    const gzhuLibraryBookingManagerImpl = new GZHULibraryBookingManagerImpl()

    this.reserveCronJobService.addLoginAheadCronJob(gzhuLibraryBookingManagerImpl, userId, reserveDto)
    this.reserveCronJobService.addReserveCronJob(gzhuLibraryBookingManagerImpl, userId, reserveDto)
  }
}
