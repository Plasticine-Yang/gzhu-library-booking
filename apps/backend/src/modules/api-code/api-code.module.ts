import { Module } from '@nestjs/common'

import { ApiCodeController } from './api-code.controller'
import { ApiCodeService } from './api-code.service'

@Module({
  controllers: [ApiCodeController],
  providers: [ApiCodeService],
})
export class ApiCodeModule {}
