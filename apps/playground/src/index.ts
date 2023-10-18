import { run } from '@gzhu-library-booking/core'

const username = process.env.GZHU_USERNAME
const password = process.env.GZHU_PASSWORD

if (username && password) {
  run({
    username,
    password,
    rules: [
      {
        beginTime: '8:30:00',
        endTime: '12:00:00',
        dayDelta: 3,
        roomName: 'E13',
        reserverStudentIdList: ['1965500019'],
      },
    ],
  })
}
