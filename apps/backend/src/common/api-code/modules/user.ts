import { ApiCodeDescription, ApiCodeNamespace } from '../decorators'

@ApiCodeNamespace('user', '用户')
export class UserModuleApiCode {
  @ApiCodeDescription('用户名重复')
  static UsernameDuplicated = 3000
}
