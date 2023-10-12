export interface CommonResponse<Data = any> {
  code: number
  message: string
  data: Data
}
