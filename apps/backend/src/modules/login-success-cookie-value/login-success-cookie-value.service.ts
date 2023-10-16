import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserSelector } from '../user/enums'
import { UserService } from '../user/user.service'
import { CacheLoginSuccessCookieValueDto } from './dto/cache-login-success-cookie-value.dto'
import { LoginSuccessCookieValue } from './entities/login-success-cookie-value.entity'

@Injectable()
export class LoginSuccessCookieValueService {
  constructor(private userService: UserService) {}

  @InjectRepository(LoginSuccessCookieValue)
  private loginSuccessCookieValueRepository: Repository<LoginSuccessCookieValue>

  async findOneByUserId(userId: number) {
    const user = await this.userService.findOne({ id: userId }, UserSelector.All, {
      relations: { loginSuccessCookieValue: true },
    })

    const loginSuccessCookieValue = user.loginSuccessCookieValue

    return loginSuccessCookieValue
  }

  async cacheLoginSuccessCookieValue(cacheLoginSuccessCookieValueDto: CacheLoginSuccessCookieValueDto) {
    const { userId, value } = cacheLoginSuccessCookieValueDto

    const user = await this.userService.findOne({ id: userId }, UserSelector.All, {
      relations: { loginSuccessCookieValue: true },
    })
    let loginSuccessCookieValue = user.loginSuccessCookieValue
    let shouldRelateUser = false

    if (loginSuccessCookieValue === null) {
      loginSuccessCookieValue = new LoginSuccessCookieValue()

      // 更新 User 实体的关联
      user.loginSuccessCookieValue = loginSuccessCookieValue
      shouldRelateUser = true
    }

    loginSuccessCookieValue.value = value

    // 保存 LoginSuccessCookieValue 和 User 实体
    const savedLoginSuccessCookieValue = await this.loginSuccessCookieValueRepository.save(loginSuccessCookieValue)
    shouldRelateUser && (await this.userService.update({ loginSuccessCookieValue }))

    return savedLoginSuccessCookieValue.value
  }
}
