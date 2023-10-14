import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CacheLoginSuccessCookieValueDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsString()
  @IsNotEmpty()
  value: string
}
