export interface ApiCodeNamespaceMetaData {
  /** 所属的命名空间 */
  namespace: string

  /** 对命名空间的描述 */
  description: string
}

export interface ApiCodeDescriptionMetaData {
  /** api code 所属命名空间 */
  namespace: string

  /** api code */
  apiCode: string

  /** 对 api code 的描述 */
  description: string
}

/** 根据 ApiCodeNamespaceMetaData 和 ApiCodeDescriptionMetaData 解析出来的 api code 信息 */
export interface ApiCodeInfo {
  namespace: string
  description: string
  apiCodeList: Omit<ApiCodeDescriptionMetaData, 'namespace'>[]
}

export type ApiCodeInfoList = ApiCodeInfo[]
