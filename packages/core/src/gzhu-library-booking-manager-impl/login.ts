import puppeteer from 'puppeteer'

import { LOGIN_SUCCESS_COOKIE_NAME } from '@/constants'
import { LoginErrorPhase } from '@/enums'
import { LoginError } from '@/errors'
import type { LoginResult } from '@/types'

async function internalLogin(username: string, password: string): Promise<LoginResult> {
  const browser = await puppeteer.launch({ headless: 'new' }).catch((reason) => {
    throw new LoginError('puppeteer 启动失败', { cause: reason, phase: LoginErrorPhase.Launch })
  })

  try {
    const page = await browser.newPage().catch((reason) => {
      throw new LoginError('开启新页面失败', { cause: reason, phase: LoginErrorPhase.NewPage })
    })

    await page.goto('http://libbooking.gzhu.edu.cn/').catch((reason) => {
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
    await page.click('#index_login_btn').catch((reason) => {
      throw new LoginError('点击登录按钮失败', {
        cause: reason,
        phase: LoginErrorPhase.ClickLoginButton,
      })
    })

    // 等待登录成功，可以根据实际情况进行等待，比如等待跳转到登录后的页面或者某个元素出现
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

    const loginSuccessCookieValue = cookies.find((cookie) => cookie.name === LOGIN_SUCCESS_COOKIE_NAME)?.value ?? ''

    if (loginSuccessCookieValue === '') {
      throw new LoginError(
        `登陆成功后返回的 cookies 中没有 ${LOGIN_SUCCESS_COOKIE_NAME} 对应的值，请排查图书馆预约系统的 cookie name 是否发生变化`,
        { phase: LoginErrorPhase.GetCookies },
      )
    }

    return {
      loginSuccessCookieValue,
    }
  } finally {
    browser.close()
  }
}

export { internalLogin }
