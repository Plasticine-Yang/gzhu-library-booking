export type MemberInfoList = MemberInfo[]

export interface MemberInfo {
  /** 人员在系统中的 id */
  accNo?: number
  balance?: null
  birthday?: null
  cardId?: null
  cardNo?: null
  classId?: null
  className?: null
  deptId?: null
  deptName?: string
  email?: null
  expiredDate?: null
  freeTime?: null
  handPhone?: null
  idCard?: null
  ident?: null
  kind?: null
  localstatus?: number
  logonName?: string
  manager?: null
  password?: null
  permsSet?: null
  pid?: null
  property?: null
  roleId?: null
  roleLevel?: null
  sex?: null
  status?: number
  subsidy?: null
  token?: null
  trueName?: null
  useQuota?: null
  uuid?: null
}

export interface GetMemberInfoRequestBody {
  /** 学号或姓名 - 用于搜索 */
  key: string

  /** 第几页 */
  page: number

  /** 每页大小 */
  pageNum: number
}
