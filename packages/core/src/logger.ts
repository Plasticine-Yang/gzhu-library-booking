import { inspect } from 'util'

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

    this.logContentList.push({ type: 'info', content: message })

    if (!notOutputToConsole) {
      console.log(message)
    }
  }

  public error(message: string, error?: Error) {
    const { notOutputToConsole } = this.options

    this.logContentList.push({ type: 'error', content: message + error ? ` ${inspect(error)}` : '' })

    if (!notOutputToConsole) {
      console.error(message, error)
    }
  }

  public consumeAndEmpty(callback: (logContentList: LogContent[]) => void) {
    callback(this.logContentList)
    this.logContentList.length = 0
  }
}
