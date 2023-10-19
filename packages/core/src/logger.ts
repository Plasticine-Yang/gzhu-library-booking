import { inspect } from 'util'

import { getNow } from './helpers'
import type { LogContent, LoggerOptions } from './types'

export class Logger {
  private options: LoggerOptions
  private logContentList: LogContent[] = []

  constructor(options?: LoggerOptions) {
    this.options = options ?? {
      notOutputToConsole: false,
    }
  }

  public log(message: string) {
    const { notOutputToConsole } = this.options
    const now = getNow()

    this.logContentList.push({ type: 'info', content: message, time: now })

    if (!notOutputToConsole) {
      console.log(`[INFO][${now}]`, message)
    }
  }

  public error(message: string, error?: Error) {
    const { notOutputToConsole } = this.options
    const now = getNow()
    const formatErrorDetail = error ? ` ${inspect(error)}` : ''

    this.logContentList.push({
      type: 'error',
      content: message + formatErrorDetail,
      time: now,
    })

    if (!notOutputToConsole) {
      console.error(`[ERROR][${now}]`, ...(error ? [message, error] : [message]))
    }
  }

  public async consumeAndEmpty(callback: (logContentList: LogContent[]) => Promise<void>) {
    try {
      await callback(this.logContentList)
    } finally {
      this.logContentList.length = 0
    }
  }
}
