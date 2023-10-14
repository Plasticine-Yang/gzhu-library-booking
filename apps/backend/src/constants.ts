import { ApiCodeDescription } from './decorators'

export class API_CODE {
  @ApiCodeDescription('api 正常响应码')
  static SUCCESS = 0

  @ApiCodeDescription('查询所有用户失败')
  static FIND_ALL_USERS_ERROR = 1000

  @ApiCodeDescription('用户 id 不存在')
  static USER_ID_NOT_FOUND = 1001

  @ApiCodeDescription('用户名已存在')
  static USERNAME_DUPLICATED = 1002

  @ApiCodeDescription('原密码错误')
  static PASSWORD_ERROR = 1003

  @ApiCodeDescription('创建 LoginSuccessCookieValue 失败')
  static CREATE_LOGIN_SUCCESS_COOKIE_VALUE_FAILED = 2000

  @ApiCodeDescription('根据用户 id 查找 LoginSuccessCookieValue 失败')
  static FIND_LOGIN_SUCCESS_COOKIE_VALUE_BY_USER_ID_FAILED = 2001
}
