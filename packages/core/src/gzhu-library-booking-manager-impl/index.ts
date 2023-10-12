import type { GZHULibraryBookingManager, GZHULibraryBookingManagerOptions, LoginResult } from '@/types'

import { internalLogin } from './login'

class GZHULibraryBookingManagerImpl implements GZHULibraryBookingManager {
  constructor(private options?: GZHULibraryBookingManagerOptions) {}

  public async login(username: string, password: string): Promise<LoginResult> {
    this.options
    const loginResult = internalLogin(username, password)

    return loginResult
  }
}

export { GZHULibraryBookingManagerImpl }
