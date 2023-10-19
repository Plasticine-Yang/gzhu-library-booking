import { run } from '@gzhu-library-booking/core'

const username = process.env.GZHU_USERNAME
const password = process.env.GZHU_PASSWORD

if (username && password) {
  run({
    username,
    password,
    mailerOptions: {
      host: 'smtp.qq.com',
      port: 465,
      user: '你的邮箱',
      pass: '你的邮箱授权码',
      from: '发送方邮箱',
      to: '接收方邮箱',
    },
    rules: [
      {
        beginTime: '8:30:00',
        endTime: '12:00:00',
        dayDelta: 3,
        roomName: 'E25',
        reserverStudentIdList: ['预约人学号'],
        initiateReserveTime: '6:30:00',
      },
    ],
  })
}
