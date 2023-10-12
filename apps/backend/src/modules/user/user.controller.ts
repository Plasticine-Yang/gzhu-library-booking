import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.userService.findAllBy()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }

  @Get(':id/login-success-cookie-value')
  async getLoginSuccessCookieValue(@Param('id') id: string) {
    const value = await this.userService.getLoginSuccessCookieValue(+id)
    return value
  }

  @Post(':id/login-success-cookie-value')
  async setLoginSuccessCookieValue(@Param('id') id: string, @Body('value') value: string) {
    const loginSuccessCookieValue = await this.userService.setLoginSuccessCookieValue(+id, value)
    return loginSuccessCookieValue
  }
}
