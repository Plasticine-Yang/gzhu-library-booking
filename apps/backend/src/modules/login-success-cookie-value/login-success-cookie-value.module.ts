import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../user/entities/user.entity'
import { LoginSuccessCookieValue } from './entities/login-success-cookie-value.entity'
import { LoginSuccessCookieValueController } from './login-success-cookie-value.controller'
import { LoginSuccessCookieValueService } from './login-success-cookie-value.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, LoginSuccessCookieValue])],
  controllers: [LoginSuccessCookieValueController],
  providers: [LoginSuccessCookieValueService],
})
export class LoginSuccessCookieValueModule {}
