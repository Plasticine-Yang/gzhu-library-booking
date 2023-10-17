import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm'

import { BusinessHttpException } from 'src/common/exceptions'

import { UserModuleApiCode } from 'src/common/api-code'
import { CreateUserDto } from './dto/create-user.dto'
import { RemoveUserDto } from './dto/remove-user.dto'
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
      throw new BusinessHttpException(UserModuleApiCode.UsernameDuplicated, `用户名: ${username} 已存在`)
    }

    const savedUser = await this.userRepository.save(createUserDto)

    return savedUser.id
  }

  findAll(where?: FindOptionsWhere<User>, selector?: UserSelector) {
    try {
      return this.userRepository.find({ where, select: resolveUserSelect(selector) })
    } catch (error) {
      throw new BusinessHttpException(UserModuleApiCode.FindAllUserFailed, '查询所有用户失败')
    }
  }

  async findOne(where: FindOptionsWhere<User>, selector?: UserSelector, options?: FindOneOptions<User>) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where,
        select: resolveUserSelect(selector),
        ...options,
      })

      return user
    } catch (error) {
      throw new BusinessHttpException(UserModuleApiCode.UserDoesNotExist, '用户不存在')
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    const { id, username, password } = updateUserDto
    const user = await this.findOne({ ...(id ? { id } : username ? { username } : null) }, UserSelector.All)
    let shouldUpdate = false

    if (password) {
      user.password = password
      shouldUpdate = true
    }

    shouldUpdate && this.userRepository.save(user)
  }

  async remove(removeUserDto: RemoveUserDto) {
    const { id, username } = removeUserDto

    const user = await this.findOne({ ...(id ? { id } : username ? { username } : null) }, UserSelector.All)

    this.userRepository.remove(user)
  }
}
