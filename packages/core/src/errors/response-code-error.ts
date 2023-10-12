import type { ResponseCodeErrorOptions } from '@/types'

class ResponseCodeError extends Error {
  public url: string
  public code: number
  public data: any
  public method: string

  constructor(options: ResponseCodeErrorOptions) {
    const { commonResponse, method, url } = options
    const { code, message, data } = commonResponse

    super(message ?? 'unknown')

    this.url = url ?? 'unknown'
    this.code = code
    this.data = data
    this.method = method ?? 'unknown'
  }
}

export { ResponseCodeError }
