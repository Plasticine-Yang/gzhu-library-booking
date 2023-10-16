import { PartialType } from '@nestjs/mapped-types'
import { IsInt, IsObject, IsString } from 'class-validator'

import { LoginSuccessCookieValue } from 'src/modules/login-success-cookie-value/entities/login-success-cookie-value.entity'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsInt()
  id?: number

  @IsString()
  username?: string

  @IsString()
  password?: string

  @IsObject()
  loginSuccessCookieValue?: LoginSuccessCookieValue
}
