import { Injectable } from '@nestjs/common'

@Injectable()
export class RoomService {
  findAll() {
    return 'asd'
  }

  findOne(id: number) {
    return `This action returns a #${id} room`
  }
}
