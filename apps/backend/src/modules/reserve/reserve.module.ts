import { Module } from '@nestjs/common'

import { ReserveCronJobService } from './reserve-cronjob.service'
import { ReserveController } from './reserve.controller'
import { ReserveService } from './reserve.service'

@Module({
  controllers: [ReserveController],
  providers: [ReserveService, ReserveCronJobService],
})
export class ReserveModule {}
