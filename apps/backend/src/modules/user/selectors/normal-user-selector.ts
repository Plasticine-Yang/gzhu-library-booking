import { FindOptionsSelect } from 'typeorm'

import { User } from '../entities/user.entity'

const normalUserSelector: FindOptionsSelect<User> = { id: true, username: true }

export { normalUserSelector }
