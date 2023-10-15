import { ApiCodeTarget } from '../types'
import { AuthModuleApiCode } from './auth'
import { CommonModuleApiCode } from './common'
import { LoginSuccessCookieValueModuleApiCode } from './login-success-cookie-value'
import { UserModuleApiCode } from './user'

const apiCodeTargetList: ApiCodeTarget[] = [
  CommonModuleApiCode as unknown as ApiCodeTarget,
  AuthModuleApiCode as unknown as ApiCodeTarget,
  UserModuleApiCode as unknown as ApiCodeTarget,
  LoginSuccessCookieValueModuleApiCode as unknown as ApiCodeTarget,
]

export { apiCodeTargetList }
