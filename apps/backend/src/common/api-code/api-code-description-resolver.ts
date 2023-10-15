import { API_CODE_NAMESPACE_METADATA_KEY } from './constants'
import { apiCodeTargetList } from './modules'
import type {
  ApiCodeDescriptionData,
  ApiCodeNamespaceMetaData,
  ApiCodeTarget,
  GetApiCodeDescriptionResult,
} from './types'

class ApiCodeDescriptionResolver {
  private resolvedApiCodeNamespaceMetaDataList: ApiCodeNamespaceMetaData[] | null

  constructor(targets: ApiCodeTarget[]) {
    try {
      this.resolvedApiCodeNamespaceMetaDataList = this.resolveApiCodeNamespaceMetaDataList(targets)
    } catch (error) {
      console.error('construct ApiCodeDescriptionResolver error', error)
      this.resolvedApiCodeNamespaceMetaDataList = null
    }
  }

  private resolveApiCodeNamespaceMetaDataList(targets: ApiCodeTarget[]): ApiCodeNamespaceMetaData[] {
    return targets.map(
      (target) => Reflect.getMetadata(API_CODE_NAMESPACE_METADATA_KEY, target) as ApiCodeNamespaceMetaData,
    )
  }

  public getResolvedApiCodeNamespaceMetaDataList() {
    return this.resolvedApiCodeNamespaceMetaDataList
  }

  public getApiCodeDescriptionData(apiCode: ApiCodeDescriptionData['apiCode']): GetApiCodeDescriptionResult | null {
    if (this.resolvedApiCodeNamespaceMetaDataList === null) {
      return null
    }

    for (const apiCodeNamespaceMetadata of this.resolvedApiCodeNamespaceMetaDataList) {
      const result = Object.values(apiCodeNamespaceMetadata.apiCodeDescriptionMetaData).find(
        (apiCodeDescriptionData) => apiCodeDescriptionData.apiCode === apiCode,
      )

      if (result) {
        return {
          ...result,
          namespace: apiCodeNamespaceMetadata.namespace,
          namespaceDescription: apiCodeNamespaceMetadata.description,
        }
      }
    }

    return null
  }
}

const apiCodeDescriptionResolver = new ApiCodeDescriptionResolver(apiCodeTargetList)

export { apiCodeDescriptionResolver }
