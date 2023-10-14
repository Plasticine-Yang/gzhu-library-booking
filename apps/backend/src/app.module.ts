import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { DatabaseModule } from './common/database'

import { configModuleOptions } from './common/use-yaml-config'
import { ApisCodeModule } from './modules/api-codes/api-codes.module'
import { UserModule } from './modules/user/user.module'
import { LoginSuccessCookieValueModule } from './modules/login-success-cookie-value/login-success-cookie-value.module'

@Module({
  // ============== application modules ==============
  imports: [
    // 加载 yaml 格式的配置文件
    ConfigModule.forRoot(configModuleOptions),

    // 日志
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),

    // 数据库
    DatabaseModule.forRoot({ type: 'mysql' }),

    // ============== business modules ==============
    ApisCodeModule,
    UserModule,
    LoginSuccessCookieValueModule,
  ],
})
export class AppModule {}