import { GZHULibraryBookingManagerImpl, LoginError } from '@gzhu-library-booking/core'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthModuleApiCode } from 'src/common/api-code'
import { BusinessHttpException } from 'src/common/exceptions'

import { LoginSuccessCookieValueService } from '../login-success-cookie-value/login-success-cookie-value.service'
import { UserSelector } from '../user/enums'
import { UserService } from '../user/user.service'
import { LoginGZHULibraryBookingSystemValueDto } from './dto/login-gzhu-library-booking-system-value.dto'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { JwtUserPayload } from './types'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private LoginSuccessCookieValueService: LoginSuccessCookieValueService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, password, confirmPassword, inviteCode } = registerDto

    // 校验两次密码是否一致
    if (password !== confirmPassword) {
      throw new BusinessHttpException(AuthModuleApiCode.PasswordAndConfirmPasswordNotMatch)
    }

    // TODO 邀请码验证逻辑
    if (inviteCode !== 'inviteCode') {
      throw new BusinessHttpException(AuthModuleApiCode.InviteCodeInvalid)
    }

    await this.userService.create({ username, password })
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto

    const user = await this.userService.findOne({ username }, UserSelector.All)

    if (username !== loginDto.username || password !== user.password) {
      throw new BusinessHttpException(AuthModuleApiCode.UsernameOrPasswordError)
    }

    const payload: JwtUserPayload = { id: user.id, username: user.username }
    const accessToken = await this.jwtService.signAsync(payload)

    return {
      accessToken,
    }
  }

  async loginGZHULibraryBookingSystem(loginGZHULibraryBookingSystemValueDto: LoginGZHULibraryBookingSystemValueDto) {
    const { userId, username, password } = loginGZHULibraryBookingSystemValueDto
    const gzhuLibraryBookingManagerImpl = new GZHULibraryBookingManagerImpl()

    try {
      const loginResult = await gzhuLibraryBookingManagerImpl.login(username, password)

      this.LoginSuccessCookieValueService.cacheLoginSuccessCookieValue({ userId, value: loginResult.cookieValue })

      return loginResult
    } catch (error) {
      let errorMessage = ''

      if (error instanceof LoginError) {
        errorMessage = error.message
      } else {
        errorMessage = '未知错误'
      }

      throw new BusinessHttpException(AuthModuleApiCode.LoginGZHULibraryBookingSystemFailed, errorMessage)
    }
  }
}
