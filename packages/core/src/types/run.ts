import { Logger } from '@/logger'

import { LoggerOptions } from './logger'
import { MailerOptions } from './mailer'
import { PuppeteerOptions } from './puppeteer'
import type { RequestInstanceOptions } from './request-instance'

export interface RunOptions {
  username: string
  password: string
  rules: ReserveRule[]
  concurrency?: number
  requestInstanceOptions?: RequestInstanceOptions
  loggerOptions?: LoggerOptions
  mailerOptions?: MailerOptions
  puppeteerOptions?: PuppeteerOptions
}

export interface RunUnitOfWorkOptions {
  runOptions: RunOptions
  logger: Logger
}

export interface ReserveRule {
  /** @example "08:30:00" */
  beginTime: string

  /** @example "12:00:00" */
  endTime: string

  /** 预约几天后的房间 */
  dayDelta: 1 | 2 | 3

  /**
   * 房间名
   *
   * @example E13
   */
  roomName: string

  /** 预约人的学号 */
  reserverStudentIdList: string[]

  /**
   * 发起预约的时间
   *
   * @default "6:30"
   */
  initiateReserveTime?: string

  /** @default false */
  runWhenReady?: boolean
}
