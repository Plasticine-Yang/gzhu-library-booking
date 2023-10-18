import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AddReserveCronJobDto {
  @IsString()
  @IsNotEmpty()
  reserveTime: string

  @IsString()
  @IsNotEmpty()
  gzhuUsername: string

  @IsString()
  @IsNotEmpty()
  gzhuPassword: string

  @IsString()
  @IsNotEmpty()
  appointmentInitiatorStudentId: string

  @IsString()
  @IsNotEmpty()
  beginTime: string

  @IsString()
  @IsNotEmpty()
  endTime: string

  @IsArray()
  deviceIdList: number[]

  @IsArray()
  appointmentStudentIdList: string[]

  @IsNumber()
  loginAheadDuration?: number

  @IsNumber()
  concurrencyLevel?: number
}
