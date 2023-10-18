import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from 'src/modules/user/entities/user.entity'
import type { Device } from '../types'

@Entity()
export class ReserveRecord {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  cronJobName: string

  @Column()
  cronTime: string

  @Column()
  gzhuUsername: string

  @Column()
  gzhuPassword: string

  @Column()
  appointmentInitiatorStudentId: string

  @Column()
  beginTime: string

  @Column()
  endTime: string

  @Column('simple-array')
  deviceList: Device[]

  @Column('simple-array')
  appointmentStudentIdList: string[]

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}
