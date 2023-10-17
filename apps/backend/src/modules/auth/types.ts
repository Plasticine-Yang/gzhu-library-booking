import { Request } from 'express'
import { User } from '../user/entities/user.entity'

export type JwtUserPayload = Pick<User, 'id' | 'username'>

export type RequestWithJwtUserPayload = Request & { user: JwtUserPayload }
