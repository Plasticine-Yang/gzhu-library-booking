import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class LoginGZHULibraryBookingSystemValueDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}
