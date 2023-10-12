import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { LoginSuccessCookieValue } from './login-success-cookie-value.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @OneToOne(() => LoginSuccessCookieValue, { cascade: true })
  @JoinColumn()
  loginSuccessCookieValue: LoginSuccessCookieValue
}
