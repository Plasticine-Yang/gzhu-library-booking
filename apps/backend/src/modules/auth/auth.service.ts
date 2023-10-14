import { Injectable } from '@nestjs/common'

import { BusinessHttpException } from 'src/common/exceptions'
import { API_CODE } from 'src/constants'

import { LoginDto } from '../dto/login.dto'
import { RegisterDto } from '../dto/register.dto'
import { UserSelector } from '../user/enums'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(registerDto: RegisterDto) {
    const { username, password, confirmPassword, inviteCode } = registerDto

    // 校验两次密码是否一致
    if (password !== confirmPassword) {
      throw new BusinessHttpException(API_CODE.PASSWORD_MISMATCH_ERROR, '两次输入的密码不一致')
    }

    // TODO 邀请码验证逻辑
    if (inviteCode !== 'inviteCode') {
      throw new BusinessHttpException(API_CODE.INVITE_CODE_INVALID, '邀请码无效')
    }

    await this.userService.create({ username, password })
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto

    const user = await this.userService.findOne({ username }, UserSelector.All)

    if (username !== loginDto.username || password !== user.password) {
      throw new BusinessHttpException(API_CODE.USERNAME_OR_PASSWORD_ERROR, '用户名或密码错误')
    }

    // TODO: jwt
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    }
  }
}
