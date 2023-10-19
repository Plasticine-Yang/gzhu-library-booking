import puppeteer from 'puppeteer'

import {
  DEFAULT_NO_SANDBOX,
  DEFAULT_OPEN_BROWSER,
  GZHU_LIBRARY_BOOKING_SYSTEM_URL,
  LOGIN_SUCCESS_COOKIE_NAME,
  LOGIN_URL,
} from '@/constants'
import { LoginErrorPhase } from '@/enums'
import { LoginError } from '@/errors'
import { PerformanceImpl } from '@/performance-impl'
import type { InternalLoginOptions, LoginResult } from '@/types'

const GZHU_LIBRARY_BOOKING_OPEN_BROWSER = process.env.GZHU_LIBRARY_BOOKING_OPEN_BROWSER === 'true' ? true : undefined
const GZHU_LIBRARY_BOOKING_NO_SANDBOX = process.env.GZHU_LIBRARY_BOOKING_NO_SANDBOX === 'true' ? true : undefined

async function internalLogin(username: string, password: string, options: InternalLoginOptions): Promise<LoginResult> {
  const { puppeteerOptions } = options
  const openBrowser = puppeteerOptions?.openBrowser ?? GZHU_LIBRARY_BOOKING_OPEN_BROWSER ?? DEFAULT_OPEN_BROWSER
  const noSandBox = puppeteerOptions?.noSandBox ?? GZHU_LIBRARY_BOOKING_NO_SANDBOX ?? DEFAULT_NO_SANDBOX

  const performanceImpl = new PerformanceImpl()
  performanceImpl.start()

  const browser = await puppeteer
    .launch({
      headless: openBrowser ? false : 'new',
      ...(noSandBox ? { args: ['--no-sandbox', '--disable-setuid-sandbox'] } : null),
    })
    .catch((reason) => {
      throw new LoginError('puppeteer 启动失败', { cause: reason, phase: LoginErrorPhase.Launch })
    })

  try {
    const page = await browser.newPage().catch((reason) => {
      throw new LoginError('开启新页面失败', { cause: reason, phase: LoginErrorPhase.NewPage })
    })

    await page.goto(GZHU_LIBRARY_BOOKING_SYSTEM_URL).catch((reason) => {
      throw new LoginError('跳转到图书馆预约首页失败', { cause: reason, phase: LoginErrorPhase.NewPage })
    })

    await page.waitForNavigation().catch((reason) => {
      throw new LoginError('未登录状态下从图书馆首页等待重定向到登录页失败', {
        cause: reason,
        phase: LoginErrorPhase.NewPage,
      })
    })

    // 定位到用户名输入框，输入用户名
    await page.type('#un', username).catch((reason) => {
      throw new LoginError('用户名输入失败', {
        cause: reason,
        phase: LoginErrorPhase.TypeUsername,
      })
    })

    // 定位到密码输入框，输入密码
    await page.type('#pd', password).catch((reason) => {
      throw new LoginError('密码输入失败', {
        cause: reason,
        phase: LoginErrorPhase.TypePassword,
      })
    })

    // 定位到登录按钮，点击登录
    page.click('#index_login_btn').catch((reason) => {
      throw new LoginError('点击登录按钮失败', {
        cause: reason,
        phase: LoginErrorPhase.ClickLoginButton,
      })
    })

    // 等待登录成功或失败的响应
    const response = await page
      .waitForResponse((response) => {
        return response.url().includes(LOGIN_URL)
      })
      .catch((reason) => {
        throw new LoginError('等待登录接口响应失败，请排查登录接口地址是否更改', {
          cause: reason,
          phase: LoginErrorPhase.Login,
        })
      })

    // 获取响应的状态码
    const responseStatus = response.status()

    if (responseStatus === 200) {
      // 登录失败
      throw new LoginError('登录失败，请检查用户名和密码是否正确', {
        phase: LoginErrorPhase.Login,
      })
    } else if (responseStatus === 302) {
      // 登录成功

      // 等待跳转到图书馆预约首页后才能获取 cookie
      await page.waitForNavigation().catch((reason) => {
        throw new LoginError('登录后重定向回图书馆预约首页失败', {
          cause: reason,
          phase: LoginErrorPhase.WaitForNavigation,
        })
      })

      // 获取登录成功后的 Cookie
      const cookies = await page.cookies().catch((reason) => {
        throw new LoginError('登录成功后获取 cookie 失败', {
          cause: reason,
          phase: LoginErrorPhase.GetCookies,
        })
      })

      const cookieValue = cookies.find((cookie) => cookie.name === LOGIN_SUCCESS_COOKIE_NAME)?.value ?? ''

      if (cookieValue === '') {
        throw new LoginError(
          `登陆成功后返回的 cookies 中没有 ${LOGIN_SUCCESS_COOKIE_NAME} 对应的值，请排查图书馆预约系统的 cookie name 是否发生变化`,
          { phase: LoginErrorPhase.GetCookies, cause: { cookies } },
        )
      }

      performanceImpl.stop()

      return {
        cookieValue,
        duration: performanceImpl.getDuration(),
      }
    } else {
      // 其他响应码，登录状态无法确定
      throw new LoginError('无法确定登录状态，请检查网络连接和登录请求', {
        phase: LoginErrorPhase.Login,
        cause: { responseStatus },
      })
    }
  } finally {
    browser.close()
  }
}

export { internalLogin }
