import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { setupAxiosInterceptors } from './setup-axios-interceptors'

class RequestInstance {
  private axiosInstance: AxiosInstance
  private loginSuccessCookieValue: string

  constructor() {
    this.axiosInstance = axios.create()
    this.loginSuccessCookieValue = ''

    setupAxiosInterceptors(this.axiosInstance)
  }

  public setLoginSuccessCookieValue(cookieValue: string) {
    this.loginSuccessCookieValue = cookieValue
  }

  public get<ResponseBody>(url: string, config?: AxiosRequestConfig<any>) {
    if (this.loginSuccessCookieValue === '') {
      throw new Error('登录成功的 cookie 不存在')
    }

    return this.axiosInstance.get<ResponseBody>(url, {
      ...config,
      headers: { Cookie: this.loginSuccessCookieValue, ...config?.headers },
    })
  }

  public post<ResponseBody, RequestBody = any>(url: string, data?: any, config?: AxiosRequestConfig<RequestBody>) {
    if (this.loginSuccessCookieValue === '') {
      throw new Error('登录成功的 cookie 不存在')
    }

    return this.axiosInstance.post<ResponseBody, AxiosResponse<ResponseBody>, RequestBody>(url, data, {
      ...config,
      headers: { Cookie: this.loginSuccessCookieValue, ...config?.headers },
    })
  }
}

const request = new RequestInstance()

export { request }
