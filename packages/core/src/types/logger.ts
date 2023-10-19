export interface LogContent {
  type: 'info' | 'error'
  content: string
  time: string
}

export interface LoggerOptions {
  /**
   * @default false
   */
  notOutputToConsole?: boolean
}
