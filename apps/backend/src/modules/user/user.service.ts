import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'

import { BusinessHttpException } from 'src/common/exceptions'
import { API_CODE } from 'src/constants'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UserSelector } from './enums'
import { resolveUserSelect } from './selectors'

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto

    const user = await this.userRepository.findOneBy({
      username,
    })

    if (user !== null) {
      throw new BusinessHttpException(API_CODE.USERNAME_DUPLICATED, `用户名: ${username} 已存在`)
    }

    const savedUser = await this.userRepository.save(createUserDto)

    return savedUser.id
  }

  findAll(where?: FindOptionsWhere<User>, selector?: UserSelector) {
    try {
      return this.userRepository.find({ where, select: resolveUserSelect(selector) })
    } catch (error) {
      throw new BusinessHttpException(API_CODE.FIND_ALL_USERS_ERROR, '查询所有用户失败')
    }
  }

  async findOne(where: FindOptionsWhere<User>, selector?: UserSelector) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where,
        select: resolveUserSelect(selector),
      })

      return user
    } catch (error) {
      throw new BusinessHttpException(API_CODE.USER_NOT_FOUND, '用户不存在')
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { oldPassword, password: newPassword } = updateUserDto

    const user = await this.findOne({ id }, UserSelector.All)

    if (user.password !== oldPassword) {
      throw new BusinessHttpException(API_CODE.PASSWORD_ERROR, '原密码错误')
    }

    user.password = newPassword
    this.userRepository.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne({ id })

    this.userRepository.remove(user)
  }
}
