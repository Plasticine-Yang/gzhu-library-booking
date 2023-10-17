import { User } from '../user/entities/user.entity'

export type JwtUserPayload = Pick<User, 'id' | 'username'>
