import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Like, Repository } from 'typeorm'

import { BusinessHttpException } from 'src/common/exceptions'
import { API_CODE } from 'src/constants'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { LoginSuccessCookieValue } from './entities/login-success-cookie-value.entity'

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>

  @InjectRepository(LoginSuccessCookieValue)
  private loginSuccessCookieValueRepository: Repository<LoginSuccessCookieValue>

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto

    const user = await this.userRepository.findOneBy({
      username,
    })

    if (user) {
      throw new BusinessHttpException(API_CODE.ENTITY_DUPLICATED, `用户名: ${username} 已存在`)
    }

    this.userRepository.save(createUserDto)
    return null
  }

  async findAllBy(where?: FindOptionsWhere<User>) {
    let users: User[]

    if (where) {
      users = await this.userRepository.findBy({
        ...where,
        username: where.username ? Like(`%${where.username}%`) : undefined,
      })
    } else {
      users = await this.userRepository.find()
    }

    return users
  }

  findOne(id: number) {
    try {
      return this.userRepository.findOneByOrFail({ id })
    } catch (error) {
      throw new BusinessHttpException(API_CODE.ENTITY_NOT_EXIST, `用户 id 不存在`, {
        httpStatusCode: HttpStatus.BAD_REQUEST,
      })
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id)
    this.userRepository.update(id, updateUserDto)
  }

  async remove(id: number) {
    const post = await this.findOne(id)
    this.userRepository.remove(post)
  }

  async getLoginSuccessCookieValue(id: number): Promise<string | null> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
        relations: { loginSuccessCookieValue: true },
      })
      const loginSuccessCookieValue = user.loginSuccessCookieValue

      return loginSuccessCookieValue.value ? loginSuccessCookieValue.value : null
    } catch (error) {
      throw new BusinessHttpException(API_CODE.ENTITY_NOT_EXIST, `用户 id 不存在`, {
        httpStatusCode: HttpStatus.BAD_REQUEST,
      })
    }
  }

  async setLoginSuccessCookieValue(id: number, value: string): Promise<LoginSuccessCookieValue> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
        relations: { loginSuccessCookieValue: true },
      })
      let loginSuccessCookieValue = user?.loginSuccessCookieValue

      if (!loginSuccessCookieValue) {
        loginSuccessCookieValue = new LoginSuccessCookieValue()

        // 更新 User 实体的关联
        user.loginSuccessCookieValue = loginSuccessCookieValue
        await this.userRepository.save(user)
      }

      loginSuccessCookieValue.value = value

      // 保存 LoginSuccessCookieValue 实体
      return await this.loginSuccessCookieValueRepository.save(loginSuccessCookieValue)
    } catch (error) {
      console.log(error)
      throw new BusinessHttpException(API_CODE.ENTITY_NOT_EXIST, `用户 id 不存在`, {
        httpStatusCode: HttpStatus.BAD_REQUEST,
      })
    }
  }
}
