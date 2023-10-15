import { ApiCodeDescription, ApiCodeNamespace } from '../decorators'

@ApiCodeNamespace('common', '通用 api code')
export class CommonModuleApiCode {
  @ApiCodeDescription('成功')
  static Success = 0
}
