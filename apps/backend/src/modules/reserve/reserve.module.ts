import { Module } from '@nestjs/common'

import { UserModule } from '../user/user.module'
import { ReserveCronJobService } from './reserve-cronjob.service'
import { ReserveRecordService } from './reserve-record.service'
import { ReserveController } from './reserve.controller'
import { ReserveService } from './reserve.service'

@Module({
  imports: [UserModule],
  controllers: [ReserveController],
  providers: [ReserveService, ReserveCronJobService, ReserveRecordService],
})
export class ReserveModule {}
