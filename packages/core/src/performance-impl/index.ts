import type { Performance } from '@/types'

import { internalGetDuration } from './internal-get-duration'

class PerformanceImpl implements Performance {
  private startTime: number
  private endTime: number
  private hasStarted: boolean
  private hasStop: boolean

  constructor() {
    this.startTime = 0
    this.endTime = 0
    this.hasStarted = false
    this.hasStop = false
  }

  public start(): void {
    if (!this.hasStarted) {
      this.startTime = performance.now()
      this.hasStarted = true
    }
  }

  public stop(): void {
    if (!this.hasStop) {
      this.endTime = performance.now()
      this.hasStop = true
    }
  }

  public getDuration(): string {
    return internalGetDuration(this.startTime, this.endTime)
  }
}

export { PerformanceImpl }
