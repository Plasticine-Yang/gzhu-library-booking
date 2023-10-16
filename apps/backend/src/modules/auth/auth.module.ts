import { Module } from '@nestjs/common'

import { LoginSuccessCookieValueModule } from '../login-success-cookie-value/login-success-cookie-value.module'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [UserModule, LoginSuccessCookieValueModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
