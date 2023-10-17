import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'

import { AuthGuard } from '../auth/auth.guard'
import { ReserveDto } from './dto/reserve.dto'
import { ReserveService } from './reserve.service'
import { RequestWithJwtUserPayload } from '../auth/types'

@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Post()
  @UseGuards(AuthGuard)
  async reserve(@Req() req: RequestWithJwtUserPayload, @Body() reserveDto: ReserveDto) {
    return this.reserveService.reserve(req.user.id, reserveDto)
  }

  @Post('test')
  async test() {
    return this.reserveService.test()
  }
}
