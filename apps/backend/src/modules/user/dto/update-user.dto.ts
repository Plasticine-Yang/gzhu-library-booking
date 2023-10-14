import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString } from 'class-validator'

import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  oldPassword: string

  @IsString()
  @IsNotEmpty()
  password: string
}
