import { GZHULibraryBookingManagerImpl } from '@gzhu-library-booking/core'
import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

interface CachedCookieFileContent {
  cookieValue: string
}

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const CACHED_COOKIE_FILE_PATH = resolve(__dirname, 'cached-cookie-value.json')
const gzhuLibraryBookingManagerImpl = new GZHULibraryBookingManagerImpl()

try {
  const { cookieValue } = JSON.parse(await readFile(CACHED_COOKIE_FILE_PATH, 'utf-8')) as CachedCookieFileContent
  if (cookieValue) {
    gzhuLibraryBookingManagerImpl.setLoginSuccessCookieValue(cookieValue)
    await consume()
  } else {
    console.log('login1')
    await login()
    await consume()
  }
} catch (error) {
  console.log('login2', error)
  await login()
  await consume()
}

async function login() {
  const username = process.env.GZHU_USERNAME
  const password = process.env.GZHU_PASSWORD

  if (username && password) {
    const gzhuLibraryBookingManagerImpl = new GZHULibraryBookingManagerImpl()
    const { cookieValue, duration } = await gzhuLibraryBookingManagerImpl.login(username, password)

    console.log(`登录成功 -- cookie: ${cookieValue} | 耗时: ${duration}`)

    await writeFile(
      resolve(__dirname, CACHED_COOKIE_FILE_PATH),
      JSON.stringify({ cookieValue } as CachedCookieFileContent),
    )

    console.log('缓存 cookie 成功')
  }
}

async function consume() {
  const roomMenu = await gzhuLibraryBookingManagerImpl.getRoomMenu()
  console.log('='.repeat(30), '房间菜单', '='.repeat(30))
  console.log(roomMenu)

  const seatMenu = await gzhuLibraryBookingManagerImpl.getSeatMenu()
  console.log('='.repeat(30), '座位菜单', '='.repeat(30))
  console.log(seatMenu)
}
