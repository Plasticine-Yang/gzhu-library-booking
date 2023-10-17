import dayjs from 'dayjs'
import dayjsDurationPlugin from 'dayjs/plugin/duration'

import { ReserveModuleApiCode } from 'src/common/api-code'
import { BusinessHttpException } from 'src/common/exceptions'

function parseReserveTime(reserveTime: string) {
  const hourAndMinute = reserveTime.split(':')

  if (hourAndMinute.length !== 2) {
    throw new BusinessHttpException(ReserveModuleApiCode.ParseReserveTimeFailed)
  }

  const hour = parseInt(hourAndMinute.at(0)!, 10)
  const minute = parseInt(hourAndMinute.at(1)!, 10)

  if (isNaN(hour) || isNaN(minute)) {
    throw new BusinessHttpException(ReserveModuleApiCode.ParseReserveTimeFailed, '小时数或分钟数不是数字')
  }

  if (hour < 0 || hour > 23) {
    throw new BusinessHttpException(ReserveModuleApiCode.ParseReserveTimeFailed, '小时数不在有效范围内')
  }

  if (minute < 0 || minute > 59) {
    throw new BusinessHttpException(ReserveModuleApiCode.ParseReserveTimeFailed, '分钟数不在有效范围内')
  }

  return [hour, minute] as const
}

function resolveLoginAheadTime(reserveTime: string, loginAheadDuration: number) {
  dayjs.extend(dayjsDurationPlugin)

  const [hour, minute] = parseReserveTime(reserveTime)

  // 将时间字符串解析为 Day.js 对象
  const startTime = dayjs(`1970-01-01 ${hour}:${minute}`)

  // 创建一个 Day.js 的 duration 对象
  const durationObj = dayjs.duration(loginAheadDuration, 'minutes')

  // 使用 utc 插件进行时间计算
  const resolvedLoginAheadTime = startTime.subtract(durationObj).format('H:mm')

  return parseReserveTime(resolvedLoginAheadTime)
}

function resolveAddLoginAheadCronJobName(userId: number, hour: number, minute: number) {
  const loginAheadCronJobName = `${userId}-addLoginAhead-${hour}-${minute}`

  return loginAheadCronJobName
}

function resolveAddReserveCronJobName(userId: number, hour: number, minute: number) {
  const reserveCronJobName = `${userId}-reserve-${hour}-${minute}`

  return reserveCronJobName
}

export { parseReserveTime, resolveLoginAheadTime, resolveAddLoginAheadCronJobName, resolveAddReserveCronJobName }
