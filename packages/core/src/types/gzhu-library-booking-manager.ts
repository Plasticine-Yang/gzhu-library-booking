import type { LoginResult } from './login'

export interface GZHULibraryBookingManager {
  login(username: string, password: string): Promise<LoginResult>
}

export interface GZHULibraryBookingManagerOptions {}
