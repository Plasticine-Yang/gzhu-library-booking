import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common'
import { apiCodeDescriptionResolver } from '../api-code'
import { DEFAULT_API_CODE_DESCRIPTION } from '../api-code/constants'

interface BusinessHttpExceptionOptions extends HttpExceptionOptions {
  /** @description HTTP 状态码 */
  httpStatusCode?: number
}

/**
 * @description 业务异常
 *
 * 构造函数第二个参数传入 message 时会使用自定义消息，否则使用 ApiCodeDescription 装饰器定义的描述消息
 */
class BusinessHttpException extends HttpException {
  constructor(public code: number, message?: string, options?: BusinessHttpExceptionOptions) {
    const resolvedMessage = message
      ? message
      : apiCodeDescriptionResolver.getApiCodeDescriptionData(code)?.description ?? DEFAULT_API_CODE_DESCRIPTION

    super(resolvedMessage, options?.httpStatusCode ?? HttpStatus.OK, {
      cause: options?.cause,
      description: options?.description,
    })
  }
}

export { BusinessHttpException }
