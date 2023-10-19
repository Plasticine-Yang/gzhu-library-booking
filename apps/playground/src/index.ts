import { run } from '@gzhu-library-booking/core'

const username = process.env.GZHU_USERNAME
const password = process.env.GZHU_PASSWORD

if (username && password) {
  run({
    username,
    password,
    concurrency: 1,
    requestInstanceOptions: { proxy: { host: '127.0.0.1', port: 8899 } },
    rules: [
      {
        beginTime: '8:30:00',
        endTime: '12:00:00',
        dayDelta: 3,
        roomName: 'E21',
        reserverStudentIdList: ['1965500019'],
        initiateReserveTime: '9:00:00',
      },
    ],
  })
}
