import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'

function internalGetDuration(startTime: number, endTime: number) {
  dayjs.extend(durationPlugin)

  const duration = Math.abs(endTime - startTime)
  const dayjsDuration = dayjs.duration(duration)

  if (duration < 1000) {
    // 1000 ms 以内以 ms 为单位
    return `${duration} ms`
  } else if (duration < 60 * 1000) {
    // 60 s 以内以 s 为单位
    const seconds = dayjsDuration.asSeconds().toFixed(2)
    return `${seconds} s`
  } else if (duration < 60 * 60 * 1000) {
    // 60 min 以内以 min 为单位
    const minutes = dayjsDuration.minutes()
    const seconds = dayjsDuration.seconds()
    return `${minutes}min ${seconds}s`
  } else {
    // 24 h 以内以 h 为单位
    const hours = Math.floor(dayjsDuration.asHours())
    const minutes = dayjsDuration.minutes()
    const seconds = dayjsDuration.seconds()
    return `${hours}h ${minutes}min ${seconds}s`
  }
}

export { internalGetDuration }
