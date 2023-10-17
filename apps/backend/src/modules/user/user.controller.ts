import { Controller, Get, Req, UseGuards } from '@nestjs/common'

import { AuthGuard } from '../auth/auth.guard'
import { RequestWithJwtUserPayload } from '../auth/types'
import { UserSelector } from './enums'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  findOne(@Req() req: RequestWithJwtUserPayload) {
    const { id } = req.user

    return this.userService.findOne({ id }, UserSelector.Normal)
  }
}
