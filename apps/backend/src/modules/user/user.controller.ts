import { Controller, Get, Param } from '@nestjs/common'

import { UserSelector } from './enums'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne({ username }, UserSelector.Normal)
  }
}
