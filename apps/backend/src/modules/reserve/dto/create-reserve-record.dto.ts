import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

import { Device } from '../types'

export class CreateReserveRecordDto {
  @IsNumber()
  @IsNotEmpty()
  cronJobName: string

  @IsString()
  @IsNotEmpty()
  cronTime: string

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
  deviceList: Device[]

  @IsArray()
  appointmentStudentIdList: string[]
}
