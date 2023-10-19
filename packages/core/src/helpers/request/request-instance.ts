import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { LOGIN_SUCCESS_COOKIE_NAME } from '@/constants'
import { RequestInstanceOptions } from '@/types'

import { setupAxiosInterceptors } from './setup-axios-interceptors'

class RequestInstance {
  private axiosInstance: AxiosInstance
  private loginSuccessCookieValue: string

  constructor(options?: RequestInstanceOptions) {
    const { proxy = false } = options ?? {}

    this.axiosInstance = axios.create({
      proxy,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36',
      },
    })
    this.loginSuccessCookieValue = ''

    setupAxiosInterceptors(this.axiosInstance)
  }

  private getResolvedLoginCookieValue() {
    return `${LOGIN_SUCCESS_COOKIE_NAME}=${this.loginSuccessCookieValue}`
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
      headers: { Cookie: this.getResolvedLoginCookieValue(), ...config?.headers },
    })
  }

  public post<ResponseBody, RequestBody = any>(url: string, data?: any, config?: AxiosRequestConfig<RequestBody>) {
    if (this.loginSuccessCookieValue === '') {
      throw new Error('登录成功的 cookie 不存在')
    }

    return this.axiosInstance.post<ResponseBody, AxiosResponse<ResponseBody>, RequestBody>(url, data, {
      ...config,
      headers: { Cookie: this.getResolvedLoginCookieValue(), ...config?.headers },
    })
  }
}

export { RequestInstance }
