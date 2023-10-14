import { PartialType } from '@nestjs/mapped-types'
import { IsString } from 'class-validator'

import { CreateLoginSuccessCookieValueDto } from './create-login-success-cookie-value.dto'

export class UpdateLoginSuccessCookieValueDto extends PartialType(CreateLoginSuccessCookieValueDto) {
  @IsString()
  value: string
}
