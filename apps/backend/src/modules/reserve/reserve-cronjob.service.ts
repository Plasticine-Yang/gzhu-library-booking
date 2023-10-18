import { GZHULibraryBookingManagerImpl } from '@gzhu-library-booking/core'
import { Injectable, Logger } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'

import { ReserveModuleApiCode } from 'src/common/api-code'
import { BusinessHttpException } from 'src/common/exceptions'

import { DEFAULT_LOGIN_AHEAD_DURATION, DEFAULT_RESERVE_CONCURRENCY_LEVEL } from './constants'
import { AddReserveCronJobDto } from './dto/add-reserve-cron-job.dto'
import { ReserveDto } from './dto/reserve.dto'
import {
  parseReserveTime,
  resolveAddLoginAheadCronJobName,
  resolveAddReserveCronJobName,
  resolveLoginAheadTime,
} from './helpers'
import { ReserveRecordService } from './reserve-record.service'
import { Device } from './types'
import { EnableCronJobDto } from './dto/enable-cron-job.dto'

@Injectable()
export class ReserveCronJobService {
  private readonly logger = new Logger(ReserveCronJobService.name)

  constructor(private schedulerRegistry: SchedulerRegistry, private reserveRecordService: ReserveRecordService) {}

  private checkCronJobIsExists(cronJobName: string): boolean {
    try {
      this.schedulerRegistry.getCronJob(cronJobName)
      return true
    } catch {
      return false
    }
  }

  private async handleLoginAhead(
    gzhuLibraryBookingManagerImpl: GZHULibraryBookingManagerImpl,
    addReserveCronJobDto: AddReserveCronJobDto,
  ) {
    const { gzhuUsername, gzhuPassword } = addReserveCronJobDto

    // TODO: 将登录结果通过邮件发送给用户
    try {
      const loginResult = await gzhuLibraryBookingManagerImpl.login(gzhuUsername, gzhuPassword)

      gzhuLibraryBookingManagerImpl.setLoginSuccessCookieValue(loginResult.cookieValue)

      this.logger.log('登录广大图书馆系统成功', loginResult)

      return loginResult
    } catch (error) {
      this.logger.log('登录广大图书馆系统失败', error)

      throw new BusinessHttpException(ReserveModuleApiCode.LoginAheadFailed, error.message, { cause: error })
    }
  }

  private async handleReserve(gzhuLibraryBookingManagerImpl: GZHULibraryBookingManagerImpl, reserveDto: ReserveDto) {
    const { concurrencyLevel = DEFAULT_RESERVE_CONCURRENCY_LEVEL } = reserveDto
    const { appointmentInitiatorId, beginTime, endTime, deviceIdList, appointmentIdList } = reserveDto.reserveFormValues

    const tasks = new Array(concurrencyLevel).map(async () => {
      try {
        await gzhuLibraryBookingManagerImpl.reserve({
          appAccNo: appointmentInitiatorId,
          resvBeginTime: beginTime,
          resvEndTime: endTime,
          resvDev: deviceIdList,
          resvMember: appointmentIdList,
        })

        this.logger.log('='.repeat(30), '预约成功！', '='.repeat(30))
      } catch (error) {
        this.logger.log('='.repeat(30), '预约失败', '='.repeat(30))
        this.logger.log(error)

        throw new BusinessHttpException(ReserveModuleApiCode.ReserveFailed, error.message, { cause: error })
      }
    })

    const results = await Promise.allSettled(tasks)

    const isSuccess = results.some((result) => result.status === 'fulfilled')

    if (!isSuccess) {
      throw new BusinessHttpException(ReserveModuleApiCode.ReserveFailed)
    } else {
      // TODO: 将预约结果通过邮件发送给用户
      this.logger.log('所有并发请求都预约失败!')
    }
  }

  /** 新增提前登录定时任务 */
  public addLoginAheadCronJob(
    gzhuLibraryBookingManagerImpl: GZHULibraryBookingManagerImpl,
    userId: number,
    addReserveCronJobDto: AddReserveCronJobDto,
  ) {
    const { reserveTime, loginAheadDuration = DEFAULT_LOGIN_AHEAD_DURATION } = addReserveCronJobDto
    const [hour, minute] = resolveLoginAheadTime(reserveTime, loginAheadDuration)
    const cronJobName = resolveAddLoginAheadCronJobName(userId, hour, minute)

    if (this.checkCronJobIsExists(cronJobName)) {
      return
    }

    const job = new CronJob(`0 ${minute} ${hour} * * *`, () => {
      return this.handleLoginAhead(gzhuLibraryBookingManagerImpl, addReserveCronJobDto)
    })

    this.schedulerRegistry.addCronJob(cronJobName, job)
    job.start()
  }

  /** 新增预约定时任务 */
  public async addReserveCronJob(
    gzhuLibraryBookingManagerImpl: GZHULibraryBookingManagerImpl,
    userId: number,
    addReserveCronJobDto: AddReserveCronJobDto,
  ) {
    const {
      appointmentInitiatorStudentId,
      appointmentStudentIdList,
      beginTime,
      reserveTime,
      deviceIdList,
      endTime,
      gzhuPassword,
      gzhuUsername,
      concurrencyLevel = DEFAULT_RESERVE_CONCURRENCY_LEVEL,
      loginAheadDuration = DEFAULT_LOGIN_AHEAD_DURATION,
    } = addReserveCronJobDto

    const [hour, minute] = parseReserveTime(reserveTime)
    const cronJobName = resolveAddReserveCronJobName(userId, hour, minute)

    if (this.checkCronJobIsExists(cronJobName)) {
      throw new BusinessHttpException(ReserveModuleApiCode.ReserveCronJobExist)
    }

    if (await this.reserveRecordService.cronJobNameExist(cronJobName)) {
      throw new BusinessHttpException(ReserveModuleApiCode.ReserveRecordDuplicated)
    }

    // 登录到广大图书馆预约系统
    const loginResult = await gzhuLibraryBookingManagerImpl.login(gzhuUsername, gzhuPassword)
    gzhuLibraryBookingManagerImpl.setLoginSuccessCookieValue(loginResult.cookieValue)

    // TODO 查询房间列表转换相关数据结构
    const deviceList: Device[] = deviceIdList.map((deviceId) => ({ deviceId, deviceName: 'unknown' }))

    // 查询预约发起人的 id
    const getAppointmentInitiatorId = async (_appointmentInitiatorStudentId: string) => {
      const memberInfo = await gzhuLibraryBookingManagerImpl.getMemberInfo(_appointmentInitiatorStudentId)

      if (!memberInfo?.accNo) {
        throw new BusinessHttpException(ReserveModuleApiCode.GetAppointmentInitiatorIdFailed)
      }

      return memberInfo.accNo
    }

    // 查询预约人的 id
    const getAppointmentIdList = async (_appointmentStudentIdList: string[]) => {
      const appointmentIdList = await Promise.all(
        _appointmentStudentIdList.map(async (_appointmentStudentId) => {
          const memberInfo = await gzhuLibraryBookingManagerImpl.getMemberInfo(_appointmentStudentId)

          if (!memberInfo?.accNo) {
            throw new BusinessHttpException(ReserveModuleApiCode.GetAppointmentIdListFailed)
          }

          return memberInfo.accNo
        }),
      )

      return appointmentIdList
    }

    const [appointmentInitiatorId, appointmentIdList] = await Promise.all([
      getAppointmentInitiatorId(appointmentInitiatorStudentId),
      getAppointmentIdList(appointmentStudentIdList),
    ])

    const cronTime = `0 ${minute} ${hour} * * *`

    // 创建预约记录
    await this.reserveRecordService.createReserveRecord(userId, {
      appointmentInitiatorStudentId,
      appointmentInitiatorId,
      appointmentStudentIdList,
      appointmentIdList,
      beginTime,
      endTime,
      cronJobName,
      cronTime,
      gzhuUsername,
      gzhuPassword,
      reserveTime,
      deviceList: JSON.stringify(deviceList),
      concurrencyLevel,
      loginAheadDuration,
    })

    // 创建定时任务并启动
    const job = new CronJob(cronTime, () => {
      return this.handleReserve(gzhuLibraryBookingManagerImpl, {
        gzhuUsername,
        gzhuPassword,
        reserveTime,
        concurrencyLevel,
        loginAheadDuration,
        reserveFormValues: { appointmentIdList, appointmentInitiatorId, beginTime, endTime, deviceIdList },
      })
    })

    this.schedulerRegistry.addCronJob(cronJobName, job)
    job.start()
  }

  public async enableCronJob(userId: number, enableCronJobDto: EnableCronJobDto) {
    const { cronJobName } = enableCronJobDto
    const reserveRecord = await this.reserveRecordService.findOneByCronJobName(cronJobName)

    if (reserveRecord === null) {
      throw new BusinessHttpException(ReserveModuleApiCode.ReserveRecordNotExist)
    }

    if (reserveRecord.user.id !== userId) {
      throw new BusinessHttpException(ReserveModuleApiCode.CanNotEnableCronJobMismatchUserId)
    }

    try {
      const cronJob = this.schedulerRegistry.getCronJob(cronJobName)

      if (!cronJob.running) {
        cronJob.start()
      }
    } catch (error) {
      const gzhuLibraryBookingManagerImpl = new GZHULibraryBookingManagerImpl()
      const cronJob = new CronJob(reserveRecord.cronTime, () => {
        return this.handleReserve(gzhuLibraryBookingManagerImpl, {
          gzhuUsername: reserveRecord.gzhuUsername,
          gzhuPassword: reserveRecord.gzhuPassword,
          reserveTime: reserveRecord.reserveTime,
          concurrencyLevel: reserveRecord.concurrencyLevel,
          loginAheadDuration: reserveRecord.loginAheadDuration,
          reserveFormValues: {
            appointmentIdList: reserveRecord.appointmentIdList,
            appointmentInitiatorId: reserveRecord.appointmentInitiatorId,
            beginTime: reserveRecord.beginTime,
            endTime: reserveRecord.endTime,
            deviceIdList: (JSON.parse(reserveRecord.deviceList) as Device[]).map((device) => device.deviceId),
          },
        })
      })

      this.schedulerRegistry.addCronJob(cronJobName, cronJob)
      cronJob.start()
    }
  }

  public getCronJob(cronJobName: string) {
    try {
      return this.schedulerRegistry.getCronJob(cronJobName)
    } catch {
      return null
    }
  }
}
