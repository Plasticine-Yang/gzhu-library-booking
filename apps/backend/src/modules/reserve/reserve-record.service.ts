import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserService } from '../user/user.service'
import { CreateReserveRecordDto } from './dto/create-reserve-record.dto'
import { ReserveRecord } from './entities/reserve-record.entity'

@Injectable()
export class ReserveRecordService {
  @InjectRepository(ReserveRecord)
  private reserveRecordRepository: Repository<ReserveRecord>

  constructor(private userService: UserService) {}

  public async findAllReserveRecords(userId: number) {
    const user = await this.userService.findOne({ id: userId })
    const allReserveRecords = await this.reserveRecordRepository.find({
      where: { user },
      relations: { user: true },
      select: {
        id: true,
        appointmentInitiatorStudentId: true,
        appointmentStudentIdList: true,
        deviceList: true,
        beginTime: true,
        endTime: true,
        cronJobName: true,
        gzhuUsername: true,
        gzhuPassword: true,
        reserveTime: true,
        loginAheadDuration: true,
        concurrencyLevel: true,
      },
    })

    return allReserveRecords.map((reserveRecord) => {
      return {
        ...reserveRecord,
        deviceList: JSON.parse(reserveRecord.deviceList),
      }
    })
  }

  public findOneByCronJobName(cronJobName: string) {
    return this.reserveRecordRepository.findOne({ where: { cronJobName }, relations: { user: true } })
  }

  public async cronJobNameExist(cronJobName: string) {
    const result = await this.reserveRecordRepository.findOne({ where: { cronJobName } })
    return result !== null
  }

  public async createReserveRecord(userId: number, createReserveRecordDto: CreateReserveRecordDto) {
    const user = await this.userService.findOne({ id: userId })

    return this.reserveRecordRepository.save({
      ...createReserveRecordDto,
      user,
    })
  }
}
