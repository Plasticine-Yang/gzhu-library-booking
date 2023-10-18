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
    const allReserveRecords = await this.reserveRecordRepository.find({ where: { user }, relations: { user: true } })

    return allReserveRecords
  }

  public async createReserveRecord(userId: number, createReserveRecordDto: CreateReserveRecordDto) {
    const user = await this.userService.findOne({ id: userId })

    return this.reserveRecordRepository.save({
      ...createReserveRecordDto,
      user,
    })
  }
}
