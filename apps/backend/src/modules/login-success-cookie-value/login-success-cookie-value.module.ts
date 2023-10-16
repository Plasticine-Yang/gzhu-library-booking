import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from '../user/user.module'
import { LoginSuccessCookieValue } from './entities/login-success-cookie-value.entity'
import { LoginSuccessCookieValueService } from './login-success-cookie-value.service'

@Module({
  imports: [TypeOrmModule.forFeature([LoginSuccessCookieValue]), UserModule],
  providers: [LoginSuccessCookieValueService],
  exports: [LoginSuccessCookieValueService],
})
export class LoginSuccessCookieValueModule {}
