import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LoginSuccessCookieValue } from './entities/login-success-cookie-value.entity'
import { User } from './entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, LoginSuccessCookieValue])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
