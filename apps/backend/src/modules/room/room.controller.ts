import { Controller, Get, Param } from '@nestjs/common'
import { RoomService } from './room.service'

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  findAll() {
    return this.roomService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id)
  }
}
