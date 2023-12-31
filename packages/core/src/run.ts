import dayjs from 'dayjs'

import { DEFAULT_CONCURRENCY, DEFAULT_INITIATE_RESERVE_TIME } from './constants'
import { GZHULibraryBookingManagerImpl } from './gzhu-library-booking-manager-impl'
import { getNow } from './helpers'
import { Logger } from './logger'
import { Mailer } from './mailer'
import type { ReserveRule, RoomList, RunOptions, RunUnitOfWorkOptions } from './types'

export async function run(options: RunOptions) {
  const { concurrency = DEFAULT_CONCURRENCY, loggerOptions, mailerOptions } = options
  process.setMaxListeners(concurrency > 10 ? concurrency + 1 : 10)

  const logger = new Logger(loggerOptions)

  const tasks = new Array(concurrency).fill(null).map(async (_, unitId) => {
    try {
      return await runUnitOfWork(unitId, { runOptions: options, logger })
    } catch (error) {
      logger.error(`「unit ${unitId}」`, error as Error)
      throw error
    }
  })

  const results = await Promise.allSettled(tasks)

  if (results.some((result) => result.status === 'fulfilled')) {
    logger.log('预约成功')
  } else {
    logger.error('预约失败')
  }

  logger.consumeAndEmpty(async (logContentList) => {
    if (mailerOptions) {
      console.log('开始发送邮件上报日志...')
      try {
        const mailer = new Mailer(mailerOptions)
        await mailer.consumeLogContentList(logContentList)
        console.log('邮件上报日志成功！')
      } catch (error) {
        console.error('日志邮件发送失败', error)
      }
    }
  })
}

async function runUnitOfWork(unitId: number, options: RunUnitOfWorkOptions) {
  const { username, password, rules, requestInstanceOptions, puppeteerOptions, maxLoginFailedRetryCount } =
    options.runOptions
  const { logger } = options

  logger.log(`工作单元 ${unitId} 开始运行...`)

  const gzhuLibraryBookingManagerImpl = new GZHULibraryBookingManagerImpl({
    requestInstanceOptions,
    puppeteerOptions,
    maxLoginFailedRetryCount,
  })

  const loginResult = await gzhuLibraryBookingManagerImpl.login(username, password)
  const { cookieValue } = loginResult

  gzhuLibraryBookingManagerImpl.setLoginSuccessCookieValue(cookieValue)

  /** 获取自己的 id */
  const appAccNo = await resolveAppAccNo(gzhuLibraryBookingManagerImpl, username)

  /** 获取 labId */
  const labId = await resolveLabId(gzhuLibraryBookingManagerImpl)

  async function performRule(rule: ReserveRule): Promise<void> {
    logger.log(`「unit ${unitId}」 开始预处理准备规则相应参数`)

    const {
      beginTime,
      endTime,
      dayDelta,
      reserverStudentIdList,
      roomName,
      initiateReserveTime = DEFAULT_INITIATE_RESERVE_TIME,
      runWhenReady,
      runWhenExpireInitiateReserveTime,
    } = rule

    const [roomList, resvMember] = await Promise.all([
      (async () => {
        logger.log(`「unit ${unitId}」 开始获取房间列表`)
        return await resolveRoomList(gzhuLibraryBookingManagerImpl, labId, dayDelta)
      })(),

      /** 根据学号获取预约人的 accNo */
      await Promise.all(
        reserverStudentIdList.map(async (reserverStudentId) => {
          logger.log(`「unit ${unitId}」 开始查询 ${reserverStudentId} 的 accNo...`)
          const memberInfo = await gzhuLibraryBookingManagerImpl.getMemberInfo(reserverStudentId)

          if (!memberInfo?.accNo) {
            throw new Error(`「unit ${unitId}」 获取预约人 ${reserverStudentId} 的 accNo 失败`)
          }

          logger.log(`「unit ${unitId}」 查询 ${reserverStudentId} 的 accNo 成功，accNo 为 ${memberInfo.accNo}`)
          return memberInfo.accNo
        }),
      ),
    ])

    /** 获取房间号 */
    const resvDev = resolveResvDev(roomList, roomName)
    logger.log(`「unit ${unitId}」 获取到 ${roomName} 的房间 devId 为 ${resvDev}`)

    if (!runWhenReady) {
      // 等到了指定时间时才发起预约请求
      logger.log(
        `「unit ${unitId}」 参数准备完毕，现在时间为 ${getNow()} 等待到达指定时间 ${initiateReserveTime} 后开始发起预约请求...`,
      )
      await waitUntil(initiateReserveTime, runWhenExpireInitiateReserveTime)
    } else {
      logger.log(`「unit ${unitId}」 参数准备完毕，开启了 runWhenReady 配置，立即发起预约请求`)
    }

    await gzhuLibraryBookingManagerImpl.reserve({
      appAccNo,
      resvBeginTime: resolveReserveRequestTime(beginTime, dayDelta),
      resvEndTime: resolveReserveRequestTime(endTime, dayDelta),
      resvDev: [resvDev],
      resvMember: resvMember,
    })
  }

  // 消费所有的规则，并发执行每个规则对应的请求
  await Promise.all(rules.map((rule) => performRule(rule)))
}

async function resolveAppAccNo(
  gzhuLibraryBookingManagerImpl: GZHULibraryBookingManagerImpl,
  reserverStudentId: string,
) {
  try {
    const appAccNo = (await gzhuLibraryBookingManagerImpl.getMemberInfo(reserverStudentId))?.accNo

    if (!appAccNo) {
      throw new Error('预约发起人的 appAccNo 获取失败')
    }

    return appAccNo
  } catch (error) {
    throw new Error('预约发起人的 appAccNo 获取失败', { cause: error })
  }
}

async function resolveLabId(gzhuLibraryBookingManagerImpl: GZHULibraryBookingManagerImpl) {
  const roomMenu = await gzhuLibraryBookingManagerImpl.getRoomMenu()
  const labId = roomMenu
    .find((room) => room.name.includes('大学城'))
    ?.children.find((child) => child.name.includes('图书馆一楼'))?.id

  if (!labId) {
    throw new Error('获取 labId 失败')
  }

  return labId
}

function resolveResvDates(dayDelta: number) {
  const today = dayjs()
  const resvDates = today.add(dayDelta, 'day').format('YYYYMMDD')

  return resvDates
}

async function resolveRoomList(
  gzhuLibraryBookingManagerImpl: GZHULibraryBookingManagerImpl,
  labId: number,
  dayDelta: number,
) {
  try {
    return await gzhuLibraryBookingManagerImpl.getRoomList({
      labIds: labId,
      sysKind: 1,
      resvDates: resolveResvDates(dayDelta),
    })
  } catch (error) {
    throw new Error(`获取 ${dayDelta} 天后的房间列表失败`, { cause: error })
  }
}

function resolveResvDev(roomList: RoomList, roomName: string) {
  const resvDev = roomList.find((room) => room.devName.includes(roomName))?.devId

  if (!resvDev) {
    throw new Error(`获取 ${roomName} 的房间号失败`)
  }

  return resvDev
}

function resolveReserveRequestTime(time: string, dayDelta: number) {
  const today = dayjs()
  const date = today.add(dayDelta, 'day').format('YYYY-MM-DD')

  return `${date} ${time}`
}

async function waitUntil(initiateReserveTime: string, runWhenExpireInitiateReserveTime?: boolean) {
  const [hour, minute, second] = (initiateReserveTime.split(':') as [string, string, string]).map((item) =>
    parseInt(item, 10),
  )

  // 设置目标时间为当天的 6:30:00
  let targetTime = dayjs().set('hour', hour).set('minute', minute).set('second', second)
  const currentTime = dayjs() // 获取当前时间

  // 未开启超过预定时间后立刻执行功能时需要等到下一天的这个时候再执行
  if (!runWhenExpireInitiateReserveTime) {
    if (currentTime.isAfter(targetTime)) {
      // 如果当前时间已经晚于目标时间，则将目标时间设置为第二天的 6:30:00
      targetTime = targetTime.add(1, 'day')
    }
  }

  const timeToWait = targetTime.diff(currentTime) // 计算需要等待的时间（毫秒）
  await new Promise((resolve) => setTimeout(resolve, timeToWait)) // 等待指定的时间

  // 等待结束后，返回一个解析（resolve）的值
  return true
}
