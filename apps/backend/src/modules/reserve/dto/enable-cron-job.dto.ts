import { IsNotEmpty, IsString } from 'class-validator'

export class EnableCronJobDto {
  @IsString()
  @IsNotEmpty()
  cronJobName: string
}
