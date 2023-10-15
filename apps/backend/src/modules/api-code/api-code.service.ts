import { Injectable } from '@nestjs/common'

import { apiCodeDescriptionResolver } from 'src/common/api-code'

@Injectable()
export class ApiCodeService {
  findAll() {
    return apiCodeDescriptionResolver.getResolvedApiCodeNamespaceMetaDataList()
  }

  findOne(apiCode: number) {
    return apiCodeDescriptionResolver.getApiCodeDescriptionData(apiCode)
  }
}
