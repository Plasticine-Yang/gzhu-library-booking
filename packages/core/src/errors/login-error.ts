import { LoginErrorPhase } from '@/enums'
import type { LoginErrorOptions } from '@/types'

class LoginError extends Error {
  public phase: LoginErrorPhase

  constructor(message: string, options?: LoginErrorOptions) {
    super(message, { cause: options?.cause })

    this.phase = options?.phase ?? LoginErrorPhase.Unknown
  }
}

export { LoginError }
