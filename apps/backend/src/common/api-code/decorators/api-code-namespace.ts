import {
  API_CODE_DESCRIPTION_METADATA_KEY,
  API_CODE_NAMESPACE_METADATA_KEY,
  DEFAULT_API_CODE_NAMESPACE_DESCRIPTION,
} from '../constants'
import type { ApiCodeDescriptionMetaData, ApiCodeNamespaceMetaData } from '../types'

/**
 * 为 api code 声明命名空间
 * @param namespace api code 的命名空间
 * @param description 对命名空间的描述 - 比如可以起个中文名描述这个命名空间
 */
function ApiCodeNamespace(namespace: string, description?: string): ClassDecorator {
  return (target) => {
    const apiCodeDescriptionMetaData: ApiCodeDescriptionMetaData | undefined =
      Reflect.getMetadata(API_CODE_DESCRIPTION_METADATA_KEY, target) ?? {}

    Reflect.defineMetadata(
      API_CODE_NAMESPACE_METADATA_KEY,
      {
        namespace,
        description: description ?? DEFAULT_API_CODE_NAMESPACE_DESCRIPTION,
        apiCodeDescriptionMetaData,
      } as ApiCodeNamespaceMetaData,
      target,
    )
  }
}

export { ApiCodeNamespace }
