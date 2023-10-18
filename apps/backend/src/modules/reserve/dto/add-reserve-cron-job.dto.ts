import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class AddReserveRecordDto {
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
}
