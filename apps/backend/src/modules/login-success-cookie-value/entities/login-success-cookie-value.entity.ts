import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class LoginSuccessCookieValue {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  value: string
}
