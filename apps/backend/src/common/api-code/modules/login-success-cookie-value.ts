import { ApiCodeDescription, ApiCodeNamespace } from '../decorators'

@ApiCodeNamespace('login-success-cookie-value', '图书馆预约系统登录成功后的 cookie')
export class LoginSuccessCookieValueModuleApiCode {
  @ApiCodeDescription('Cookie 错误')
  static CookieError = 2000
}
