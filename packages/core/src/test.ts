import { GZHULibraryBookingManagerImpl } from '../dist/index.js'

const username = process.env.GZHU_USERNAME
const password = process.env.GZHU_PASSWORD

if (username && password) {
  const gzhuLibraryBookingManagerImpl = new GZHULibraryBookingManagerImpl()
  const { loginSuccessCookieValue } = await gzhuLibraryBookingManagerImpl.login(username, password)

  console.log(loginSuccessCookieValue)
}
