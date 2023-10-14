import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'

import { BusinessHttpException } from 'src/common/exceptions'
import { API_CODE } from 'src/constants'

import { User } from '../user/entities/user.entity'
import { CreateLoginSuccessCookieValueDto } from './dto/create-login-success-cookie-value.dto'
import { UpdateLoginSuccessCookieValueDto } from './dto/update-login-success-cookie-value.dto'
import { LoginSuccessCookieValue } from './entities/login-success-cookie-value.entity'

@Injectable()
export class LoginSuccessCookieValueService {
  @InjectRepository(User)
  private userRepository: Repository<User>

  @InjectRepository(LoginSuccessCookieValue)
  private loginSuccessCookieValueRepository: Repository<LoginSuccessCookieValue>

  async create(createLoginSuccessCookieValueDto: CreateLoginSuccessCookieValueDto) {
    const { userId, value } = createLoginSuccessCookieValueDto

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
        throw new BusinessHttpException(API_CODE.CREATE_LOGIN_SUCCESS_COOKIE_VALUE_FAILED, '用户 id 不存在', {
          httpStatusCode: HttpStatus.BAD_REQUEST,
        })
      } else {
        throw new BusinessHttpException(API_CODE.CREATE_LOGIN_SUCCESS_COOKIE_VALUE_FAILED, '未知错误', {
          httpStatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        })
      }
    }
  }

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
        throw new BusinessHttpException(API_CODE.FIND_LOGIN_SUCCESS_COOKIE_VALUE_BY_USER_ID_FAILED, '用户 id 不存在', {
          httpStatusCode: HttpStatus.BAD_REQUEST,
        })
      } else {
        throw new BusinessHttpException(API_CODE.FIND_LOGIN_SUCCESS_COOKIE_VALUE_BY_USER_ID_FAILED, '未知错误', {
          httpStatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        })
      }
    }
  }

  async update(userId: number, updateLoginSuccessCookieValueDto: UpdateLoginSuccessCookieValueDto) {
    const { value } = updateLoginSuccessCookieValueDto

    const loginSuccessCookieValue = await this.findOneByUserId(userId)

    if (loginSuccessCookieValue !== null) {
      loginSuccessCookieValue.value = value

      this.loginSuccessCookieValueRepository.save(loginSuccessCookieValue)
    }
  }
}
