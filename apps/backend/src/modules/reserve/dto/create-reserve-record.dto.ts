import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateReserveRecordDto {
  @IsString()
  @IsNotEmpty()
  cronJobName: string

  @IsString()
  @IsNotEmpty()
  cronTime: string

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

  @IsNumber()
  @IsNotEmpty()
  appointmentInitiatorId: number

  @IsString()
  @IsNotEmpty()
  beginTime: string

  @IsString()
  @IsNotEmpty()
  endTime: string

  @IsString()
  @IsNotEmpty()
  deviceList: string

  @IsArray()
  appointmentStudentIdList: string[]

  @IsArray()
  appointmentIdList: number[]

  @IsNumber()
  loginAheadDuration?: number

  @IsNumber()
  concurrencyLevel?: number
}
