/**
 * 约束可解析出 ApiCodeInfo 的类型
 *
 * 只有符合该定义的类型，并且使用了 ApiCodeNamespace 和 ApiCodeDescription 装饰器后才能解析出 ApiCodeNamespaceMetaData
 * 目前最佳实践是使用 ApiCodeNamespace 装饰一个类，并且将所有的 api code 定义成静态属性，然后对这些属性使用 ApiCodeDescription 装饰器
 *
 * ApiCodeNamespace 装饰类时对应的 target 是构造函数自身
 * ApiCodeDescription 装饰静态属性时对应的 target 也是构造函数自身
 *
 * 这里的类型约束就是要求一个构造函数对象上拥有 api code 属性定义
 */
export type ApiCodeTarget = FunctionConstructor & Record<PropertyKey, number>

/** api code 命名空间元数据 */
export interface ApiCodeNamespaceMetaData {
  /** 命名空间 */
  namespace: string

  /** 对命名空间的描述 */
  description: string

  /** 该命名空间下所拥有的 api code */
  apiCodeDescriptionMetaData: ApiCodeDescriptionMetaData
}

/** api code 描述信息元数据 */
export type ApiCodeDescriptionMetaData = Record<string, ApiCodeDescriptionData>

export interface ApiCodeDescriptionData {
  /** api code */
  apiCode: number

  /** 对 api code 的描述 */
  description: string
}

export type GetApiCodeDescriptionResult = ApiCodeDescriptionData & { namespace: string; namespaceDescription: string }
