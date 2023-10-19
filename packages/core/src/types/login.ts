import type { PuppeteerOptions } from './puppeteer'

export interface LoginResult {
  /** 登陆成功后的 cookie value */
  cookieValue: string

  /** 登录耗时 */
  duration: string
}

export interface InternalLoginOptions {
  puppeteerOptions?: PuppeteerOptions
}
