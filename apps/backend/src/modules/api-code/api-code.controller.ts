import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'

import { ApiCodeService } from './api-code.service'

@Controller('api-code')
export class ApiCodeController {
  constructor(private readonly apiCodeService: ApiCodeService) {}

  @Get()
  findAll() {
    return this.apiCodeService.findAll()
  }

  @Get(':apiCode')
  findOneByApiCode(@Param('apiCode', ParseIntPipe) apiCode: number) {
    return this.apiCodeService.findOne(apiCode)
  }
}
