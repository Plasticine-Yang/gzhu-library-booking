import { PartialType } from '@nestjs/mapped-types'
import { IsInt, IsString } from 'class-validator'

import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsInt()
  id?: number

  @IsString()
  username?: string

  @IsString()
  password?: string
}
