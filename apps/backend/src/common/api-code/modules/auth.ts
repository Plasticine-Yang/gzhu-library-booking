import { ApiCodeDescription, ApiCodeNamespace } from '../decorators'

@ApiCodeNamespace('auth', '认证模块')
export class AuthModuleApiCode {
  @ApiCodeDescription('用户名或密码错误')
  static UsernameOrPasswordError = 1000
}
