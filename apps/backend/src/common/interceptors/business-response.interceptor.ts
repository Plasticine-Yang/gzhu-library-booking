import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import type { BusinessResponse } from 'src/types'

import { CommonModuleApiCode } from '../api-code'

/**
 * @description 业务统一响应体拦截器
 */
class BusinessResponseInterceptor<T> implements NestInterceptor<T, BusinessResponse<T>> {
  intercept(_: ExecutionContext, next: CallHandler<T>): Observable<BusinessResponse<T>> {
    return next.handle().pipe<BusinessResponse<T>>(
      map((data) => ({
        code: CommonModuleApiCode.Success,
        message: 'success',
        data,
      })),
    )
  }
}

export { BusinessResponseInterceptor }
