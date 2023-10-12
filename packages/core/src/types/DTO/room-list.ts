export type RoomList = RoomListItem[]

export interface RoomListItem {
  addServices: null
  coordinate: null
  deadlineTime: null
  deviceAttributes: null
  devId: number
  devName: string
  devProp: number
  devSn: number
  devStatus: number
  endDayOpenInfo: null
  icon: null
  kindId: number
  kindName: string
  kindProp: number
  kindUrl: string
  labId: number
  labName: string
  labProp: number
  maintenanceTime: null
  maxUser: number
  minUser: number
  onlyView: boolean
  openEnd: string
  openRulesn: number
  openStart: string
  openState: number
  openTimes: OpenTime[]
  pointProperty: null
  pointSize: null
  resvInfo: ResvInfo[]
  resvRule: ResvRule
  roomId: number
  roomName: string
  roomProp: number
  roomSn: string
  startDayOfWeek: null
  timeScopeOpenInfo: null
  usePersonType: null
}

export interface OpenTime {
  openEndTime: string
  openLimit: number
  openStartTime: string
}

export interface ResvInfo {
  devId: number
  endTime: number
  logonName: string
  resvEndRealTime: null
  resvId: number
  resvStatus: number
  startTime: number
  title: string
  trueName: string
  uuid: string
}

export interface ResvRule {
  allowConflict: null
  cancelTime: number
  classKind: number
  deadlineTime: number
  defaultMode: null
  defaultRatio: null
  defaultValue: null
  deptId: number
  devId: string
  devKindList: string
  devRoomList: null
  devType: number
  earliestResvTime: number
  earlyInTime: number
  endMode: number
  freezingTime: number
  gmtCreate: number
  gmtModified: number
  groupId: number
  ident: number
  laterLineTime: number
  latestResvTime: number
  limit: number
  maxResvTime: number
  memo: null
  minResvTime: number
  priority: number
  rangeNum: number
  resvAfterNoticeTime: number
  resvBeforeNoticeTime: number
  resvEndNewTime: number
  resvEndNoticeTime: number
  ruleId: number
  ruleName: string
  seriesTimeLimit: number
  startDayOfWeek: number
  timeInterval: number
  useDuration: null
  uuid: string
}

export interface GetRoomListRequestBody {
  /**
   * 预约日期 - 格式类似 20231012
   */
  resvDates: string

  /** 暂时未知用处 - 暂定为 1 */
  sysKind: number

  /** 区域 id - 比如图书馆一楼 or 五楼 */
  labIds: string
}
