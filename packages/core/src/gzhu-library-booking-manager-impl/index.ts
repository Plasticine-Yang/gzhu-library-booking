import type { GZHULibraryBookingManager, GZHULibraryBookingManagerOptions, LoginResult } from '@/types'
import { internalLogin } from './login'

class GZHULibraryBookingManagerImpl implements GZHULibraryBookingManager {
  constructor(private options?: GZHULibraryBookingManagerOptions) {}

  public login(username: string, password: string): Promise<LoginResult> {
    this.options
    return internalLogin(username, password)
  }
}

export { GZHULibraryBookingManagerImpl }
