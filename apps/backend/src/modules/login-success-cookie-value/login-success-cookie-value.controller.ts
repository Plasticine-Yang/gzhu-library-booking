import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'

import { CreateLoginSuccessCookieValueDto } from './dto/create-login-success-cookie-value.dto'
import { UpdateLoginSuccessCookieValueDto } from './dto/update-login-success-cookie-value.dto'
import { LoginSuccessCookieValueService } from './login-success-cookie-value.service'

@Controller('login-success-cookie-value')
export class LoginSuccessCookieValueController {
  constructor(private readonly loginSuccessCookieValueService: LoginSuccessCookieValueService) {}

  @Post()
  create(@Body() createLoginSuccessCookieValueDto: CreateLoginSuccessCookieValueDto) {
    return this.loginSuccessCookieValueService.create(createLoginSuccessCookieValueDto)
  }

  @Get(':userId')
  findOneByUserId(@Param('userId') userId: string) {
    return this.loginSuccessCookieValueService.findOneByUserId(+userId)
  }

  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() updateLoginSuccessCookieValueDto: UpdateLoginSuccessCookieValueDto) {
    return this.loginSuccessCookieValueService.update(+userId, updateLoginSuccessCookieValueDto)
  }
}