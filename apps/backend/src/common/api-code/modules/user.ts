import { ApiCodeDescription, ApiCodeNamespace } from '../decorators'

@ApiCodeNamespace('user', '用户')
export class UserModuleApiCode {
  @ApiCodeDescription('用户名重复')
  static UsernameDuplicated = 3000

  @ApiCodeDescription('查询所有用户失败')
  static FindAllUserFailed = 3001

  @ApiCodeDescription('用户不存在')
  static UserDoesNotExist = 3002
}
