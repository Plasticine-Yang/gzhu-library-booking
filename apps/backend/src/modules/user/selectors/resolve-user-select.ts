import { FindOptionsSelect } from 'typeorm'

import { User } from '../entities/user.entity'
import { UserSelector } from '../enums'
import { allUserSelector } from './all-user-selector'
import { normalUserSelector } from './normal-user-selector'

function resolveUserSelect(selector: UserSelector = UserSelector.Normal): FindOptionsSelect<User> {
  switch (selector) {
    case UserSelector.All:
      return allUserSelector

    case UserSelector.Normal:
    default:
      return normalUserSelector
  }
}

export { resolveUserSelect }
