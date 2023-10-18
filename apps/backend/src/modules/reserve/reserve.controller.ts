import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'

import { AuthGuard } from '../auth/auth.guard'
import { RequestWithJwtUserPayload } from '../auth/types'
import { AddReserveCronJobDto } from './dto/add-reserve-cron-job.dto'
import { EnableCronJobDto } from './dto/enable-cron-job.dto'
import { ReserveCronJobService } from './reserve-cronjob.service'
import { ReserveRecordService } from './reserve-record.service'
import { ReserveService } from './reserve.service'

@Controller('reserve')
export class ReserveController {
  constructor(
    private readonly reserveService: ReserveService,
    private readonly reserveRecordService: ReserveRecordService,
    private readonly reserveCronJobService: ReserveCronJobService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async reserve(@Req() req: RequestWithJwtUserPayload, @Body() addReserveCronJobDto: AddReserveCronJobDto) {
    return this.reserveService.reserve(req.user.id, addReserveCronJobDto)
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAllReserveRecords(@Req() req: RequestWithJwtUserPayload) {
    return this.reserveRecordService.findAllReserveRecords(req.user.id)
  }

  @Get('cron-job-is-running/:cronJobName')
  @UseGuards(AuthGuard)
  async cronJobIsRunning(@Param('cronJobName') cronJobName: string) {
    return this.reserveCronJobService.getCronJob(cronJobName)?.running ?? false
  }

  @Post('enable-cron-job')
  @UseGuards(AuthGuard)
  async enableCronJob(@Req() req: RequestWithJwtUserPayload, @Body() enableCronJobDto: EnableCronJobDto) {
    return this.reserveCronJobService.enableCronJob(req.user.id, enableCronJobDto)
  }
}
