import type { LoginErrorPhase } from '@/enums'

export interface LoginErrorOptions extends ErrorOptions {
  phase?: LoginErrorPhase
}
