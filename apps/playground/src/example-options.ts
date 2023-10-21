import type { RunOptions } from '@gzhu-library-booking/core'

export const runOptions: RunOptions = {
  username: '数字广大用户名',
  password: '数字广大密码',
  mailerOptions: {
    host: 'smtp.qq.com',
    port: 465,
    user: '你的邮箱',
    pass: '你的邮箱授权码',
    from: '发件人邮箱',
    to: '收件人邮箱',
  },
  rules: [
    {
      beginTime: '8:30:00',
      endTime: '12:00:00',
      dayDelta: 3,
      roomName: 'E21',
      reserverStudentIdList: ['你的学号'],
      runWhenReady: true,
    },
  ],
  puppeteerOptions: { noSandBox: true, openBrowser: false },
}
