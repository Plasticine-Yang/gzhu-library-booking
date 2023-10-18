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
  reserveTime: string

  @Column()
  cronTime: string

  @Column()
  gzhuUsername: string

  @Column()
  gzhuPassword: string

  @Column()
  appointmentInitiatorStudentId: string

  @Column()
  appointmentInitiatorId: number

  @Column()
  beginTime: string

  @Column()
  endTime: string

  @Column()
  deviceList: string

  @Column('simple-array')
  appointmentStudentIdList: string[]

  @Column('simple-array')
  appointmentIdList: number[]

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @Column()
  loginAheadDuration: number

  @Column()
  concurrencyLevel: number
}
