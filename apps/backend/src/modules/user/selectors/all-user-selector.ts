import { FindOptionsSelect } from 'typeorm'

import { User } from '../entities/user.entity'

const allUserSelector: FindOptionsSelect<User> = {
  id: true,
  username: true,
  password: true,
  loginSuccessCookieValue: { id: true, value: true },
}

export { allUserSelector }
