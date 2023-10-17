import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthModuleApiCode } from 'src/common/api-code'
import { BusinessHttpException } from 'src/common/exceptions'

import { UserSelector } from '../user/enums'
import { UserService } from '../user/user.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { JwtUserPayload } from './types'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

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
}
