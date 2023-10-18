import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from '../user/user.module'
import { ReserveRecord } from './entities/reserve-record.entity'
import { ReserveCronJobService } from './reserve-cronjob.service'
import { ReserveRecordService } from './reserve-record.service'
import { ReserveController } from './reserve.controller'
import { ReserveService } from './reserve.service'

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([ReserveRecord])],
  controllers: [ReserveController],
  providers: [ReserveService, ReserveCronJobService, ReserveRecordService],
})
export class ReserveModule {}
