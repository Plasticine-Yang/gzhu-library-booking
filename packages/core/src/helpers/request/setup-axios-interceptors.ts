import { ResponseCodeError } from '@/errors'
import { CommonResponse } from '@/types'
import { AxiosInstance } from 'axios'

function setupAxiosInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.response.use((response) => {
    const commonResponse = response.data as CommonResponse<any>
    const code = commonResponse.code

    if (code) {
      throw new ResponseCodeError(commonResponse)
    }

    return response
  })
}

export { setupAxiosInterceptors }
