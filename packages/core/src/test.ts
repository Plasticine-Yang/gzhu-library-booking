import { GZHULibraryBookingManagerImpl } from '../dist/index.js'

const gzhuLibraryBookingManagerImpl = new GZHULibraryBookingManagerImpl()
const { loginSuccessCookieValue } = await gzhuLibraryBookingManagerImpl.login('123', 'abc')

console.log(loginSuccessCookieValue)
