import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateLoginSuccessCookieValueDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsString()
  @IsNotEmpty()
  value: string
}
