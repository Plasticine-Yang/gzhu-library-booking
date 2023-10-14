import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common'

interface BusinessHttpExceptionOptions extends HttpExceptionOptions {
  /** @description HTTP 状态码 */
  httpStatusCode?: number
}

/**
 * @description 业务异常
 */
class BusinessHttpException extends HttpException {
  constructor(public code: number, public message: string, options?: BusinessHttpExceptionOptions) {
    super(message, options?.httpStatusCode ?? HttpStatus.OK, {
      cause: options?.cause,
      description: options?.description,
    })
  }
}

export { BusinessHttpException }
