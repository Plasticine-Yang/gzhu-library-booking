import { CommonResponse } from '../DTO'

export interface ResponseCodeErrorOptions {
  commonResponse: CommonResponse<any>
  url?: string
  method?: string
}
