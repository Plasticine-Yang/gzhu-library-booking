import { API_CODE_DESCRIPTION_METADATA_KEY } from '../constants'
import type { ApiCodeDescriptionMetaData, ApiCodeTarget } from '../types'

/**
 * 为 api code 声明描述信息
 * @param description api code 描述信息
 * @returns 属性装饰器
 */
function ApiCodeDescription(description: string): PropertyDecorator {
  return (target: ApiCodeTarget, propertyKey) => {
    const apiCodeDescriptionMetaData: ApiCodeDescriptionMetaData =
      Reflect.getMetadata(API_CODE_DESCRIPTION_METADATA_KEY, target) ?? {}

    Reflect.defineMetadata(
      API_CODE_DESCRIPTION_METADATA_KEY,
      {
        ...apiCodeDescriptionMetaData,
        [propertyKey]: {
          apiCode: target[propertyKey],
          description,
        },
      } as ApiCodeDescriptionMetaData,
      target,
    )
  }
}

export { ApiCodeDescription }
