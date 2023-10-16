import { ApiCodeDescription, ApiCodeNamespace } from '../decorators'

@ApiCodeNamespace('auth', '认证模块')
export class AuthModuleApiCode {
  @ApiCodeDescription('用户名或密码错误')
  static UsernameOrPasswordError = 1000

  @ApiCodeDescription('两次输入的密码不一致')
  static PasswordAndConfirmPasswordNotMatch = 1001

  @ApiCodeDescription('邀请码无效')
  static InviteCodeInvalid = 1002

  @ApiCodeDescription('登录到图书馆预约系统失败')
  static LoginGZHULibraryBookingSystemFailed = 1003
}
