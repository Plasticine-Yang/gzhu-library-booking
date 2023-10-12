import { GZHULibraryBookingManagerImpl } from '@gzhu-library-booking/core'

const username = process.env.GZHU_USERNAME
const password = process.env.GZHU_PASSWORD

if (username && password) {
  const gzhuLibraryBookingManagerImpl = new GZHULibraryBookingManagerImpl()
  const { cookieValue, duration } = await gzhuLibraryBookingManagerImpl.login(username, password)

  console.log(`登录成功 -- cookie: ${cookieValue} | 耗时: ${duration}`)

  const roomMenu = await gzhuLibraryBookingManagerImpl.getRoomMenu()
  console.log('房间菜单')
  console.log(roomMenu)
}
