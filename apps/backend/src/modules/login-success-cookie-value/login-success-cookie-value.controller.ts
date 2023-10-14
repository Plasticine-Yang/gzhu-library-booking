import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { CacheLoginSuccessCookieValueDto } from './dto/cache-login-success-cookie-value.dto'
import { LoginGZHULibraryBookingSystemValueDto } from './dto/login-gzhu-library-booking-system-value.dto'
import { LoginSuccessCookieValueService } from './login-success-cookie-value.service'

@Controller('login-success-cookie-value')
export class LoginSuccessCookieValueController {
  constructor(private readonly loginSuccessCookieValueService: LoginSuccessCookieValueService) {}

  @Get(':userId')
  async findOneByUserId(@Param('userId') userId: string) {
    const loginSuccessCookieValue = await this.loginSuccessCookieValueService.findOneByUserId(+userId)

    return loginSuccessCookieValue?.value ?? null
  }

  @Post()
  cache(@Body() cacheLoginSuccessCookieValueDto: CacheLoginSuccessCookieValueDto) {
    return this.loginSuccessCookieValueService.cacheLoginSuccessCookieValue(cacheLoginSuccessCookieValueDto)
  }

  @Post('login-gzhu-library-booking-system')
  async loginGZHULibraryBookingSystem(
    @Body() loginGZHULibraryBookingSystemValueDto: LoginGZHULibraryBookingSystemValueDto,
  ) {
    return this.loginSuccessCookieValueService.loginGZHULibraryBookingSystem(loginGZHULibraryBookingSystemValueDto)
  }
}
