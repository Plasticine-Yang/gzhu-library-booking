import { GZHULibraryBookingManagerImpl } from '@gzhu-library-booking/core'
import { Injectable, Logger } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'

import { ReserveModuleApiCode } from 'src/common/api-code'
import { BusinessHttpException } from 'src/common/exceptions'

import { DEFAULT_LOGIN_AHEAD_DURATION, DEFAULT_RESERVE_CONCURRENCY_LEVEL } from './constants'
import { AddReserveRecordDto } from './dto/add-reserve-cron-job.dto'
import { ReserveDto } from './dto/reserve.dto'
import {
  parseReserveTime,
  resolveAddLoginAheadCronJobName,
  resolveAddReserveCronJobName,
  resolveLoginAheadTime,
} from './helpers'
import { ReserveRecordService } from './reserve-record.service'

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

  private async handleLoginAhead(gzhuLibraryBookingManagerImpl: GZHULibraryBookingManagerImpl, reserveDto: ReserveDto) {
    const { gzhuUsername, gzhuPassword } = reserveDto

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
    reserveDto: ReserveDto,
  ) {
    const { reserveTime, loginAheadDuration = DEFAULT_LOGIN_AHEAD_DURATION } = reserveDto
    const [hour, minute] = resolveLoginAheadTime(reserveTime, loginAheadDuration)
    const cronJobName = resolveAddLoginAheadCronJobName(userId, hour, minute)

    if (this.checkCronJobIsExists(cronJobName)) {
      return
    }

    const job = new CronJob(`0 ${minute} ${hour} * * *`, () => {
      return this.handleLoginAhead(gzhuLibraryBookingManagerImpl, reserveDto)
    })

    this.schedulerRegistry.addCronJob(cronJobName, job)
    job.start()
  }

  /** 新增预约定时任务 */
  public addReserveCronJob(
    gzhuLibraryBookingManagerImpl: GZHULibraryBookingManagerImpl,
    userId: number,
    addReserveCronJobDto: AddReserveRecordDto,
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
    } = addReserveCronJobDto

    const [hour, minute] = parseReserveTime(reserveTime)
    const cronJobName = resolveAddReserveCronJobName(userId, hour, minute)

    if (this.checkCronJobIsExists(cronJobName)) {
      return
    }

    // 创建预约记录
    // this.reserveRecordService.createReserveRecord(userId, {})

    // 创建定时任务并启动
    // const job = new CronJob(`0 ${minute} ${hour} * * *`, () => {
    //   return this.handleReserve(gzhuLibraryBookingManagerImpl, reserveDto)
    // })

    // this.schedulerRegistry.addCronJob(cronJobName, job)
    // job.start()
  }
}
