import type { CommonResponse } from '@/types'

class ResponseCodeError extends Error {
  public url: string
  public code: number
  public message: string
  public data: any

  constructor(commonResponse: CommonResponse<any>, url?: string) {
    const { code, message, data } = commonResponse
    super(message ?? 'unknown')

    this.url = url ?? 'unknown'
    this.code = code
    this.message = message
    this.data = data
  }
}

export { ResponseCodeError }
