import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JWT_EXPIRES, JWT_SECRET } from './constants'

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
