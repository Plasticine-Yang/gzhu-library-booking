import { GZHULibraryBookingManagerImpl, LoginError } from '@gzhu-library-booking/core'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'

import { LoginSuccessCookieValueModuleApiCode } from 'src/common/api-code'
import { BusinessHttpException } from 'src/common/exceptions'

import { User } from '../user/entities/user.entity'
import { CacheLoginSuccessCookieValueDto } from './dto/cache-login-success-cookie-value.dto'
import { LoginGZHULibraryBookingSystemValueDto } from './dto/login-gzhu-library-booking-system-value.dto'
import { LoginSuccessCookieValue } from './entities/login-success-cookie-value.entity'

@Injectable()
export class LoginSuccessCookieValueService {
  @InjectRepository(User)
  private userRepository: Repository<User>

  @InjectRepository(LoginSuccessCookieValue)
  private loginSuccessCookieValueRepository: Repository<LoginSuccessCookieValue>

  async findOneByUserId(userId: number) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id: userId },
        relations: { loginSuccessCookieValue: true },
      })
      const loginSuccessCookieValue = user.loginSuccessCookieValue

      return loginSuccessCookieValue
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new BusinessHttpException(LoginSuccessCookieValueModuleApiCode.CookieError, '用户 id 不存在', {
          httpStatusCode: HttpStatus.BAD_REQUEST,
        })
      } else {
        throw new BusinessHttpException(LoginSuccessCookieValueModuleApiCode.CookieError, '未知错误', {
          httpStatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        })
      }
    }
  }

  async cacheLoginSuccessCookieValue(cacheLoginSuccessCookieValueDto: CacheLoginSuccessCookieValueDto) {
    const { userId, value } = cacheLoginSuccessCookieValueDto

    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id: userId },
        relations: { loginSuccessCookieValue: true },
      })
      let loginSuccessCookieValue = user?.loginSuccessCookieValue
      let shouldRelateUser = false

      if (loginSuccessCookieValue === null) {
        loginSuccessCookieValue = new LoginSuccessCookieValue()

        // 更新 User 实体的关联
        user.loginSuccessCookieValue = loginSuccessCookieValue
        shouldRelateUser = true
      }

      loginSuccessCookieValue.value = value

      // 保存 LoginSuccessCookieValue 实体
      const savedLoginSuccessCookieValue = await this.loginSuccessCookieValueRepository.save(loginSuccessCookieValue)
      shouldRelateUser && (await this.userRepository.save(user))

      return savedLoginSuccessCookieValue.value
    } catch (error) {
      console.log(error)
      if (error instanceof EntityNotFoundError) {
        throw new BusinessHttpException(LoginSuccessCookieValueModuleApiCode.CookieError, '用户 id 不存在', {
          httpStatusCode: HttpStatus.BAD_REQUEST,
        })
      } else {
        throw new BusinessHttpException(LoginSuccessCookieValueModuleApiCode.CookieError, '未知错误', {
          httpStatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        })
      }
    }
  }

  async loginGZHULibraryBookingSystem(loginGZHULibraryBookingSystemValueDto: LoginGZHULibraryBookingSystemValueDto) {
    const { userId, username, password } = loginGZHULibraryBookingSystemValueDto
    const gzhuLibraryBookingManagerImpl = new GZHULibraryBookingManagerImpl()

    try {
      const loginResult = await gzhuLibraryBookingManagerImpl.login(username, password)

      this.cacheLoginSuccessCookieValue({ userId, value: loginResult.cookieValue })

      return loginResult
    } catch (error) {
      let errorMessage = ''

      if (error instanceof LoginError) {
        errorMessage = error.message
      } else {
        errorMessage = '未知错误'
      }

      throw new BusinessHttpException(LoginSuccessCookieValueModuleApiCode.CookieError, errorMessage)
    }
  }
}
