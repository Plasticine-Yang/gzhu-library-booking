export interface LogContent {
  type: 'info' | 'error'
  content: string
}

export interface LoggerOptions {
  /**
   * @default false
   */
  notOutputToConsole?: boolean
}
