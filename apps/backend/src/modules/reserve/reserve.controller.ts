import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'

import { AuthGuard } from '../auth/auth.guard'
import { RequestWithJwtUserPayload } from '../auth/types'
import { ReserveDto } from './dto/reserve.dto'
import { ReserveRecordService } from './reserve-record.service'
import { ReserveService } from './reserve.service'

@Controller('reserve')
export class ReserveController {
  constructor(
    private readonly reserveService: ReserveService,
    private readonly reserveRecordService: ReserveRecordService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async reserve(@Req() req: RequestWithJwtUserPayload, @Body() reserveDto: ReserveDto) {
    return this.reserveService.reserve(req.user.id, reserveDto)
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAllReserveRecords(@Req() req: RequestWithJwtUserPayload) {
    return this.reserveRecordService.findAllReserveRecords(req.user.id)
  }
}
