import { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface MyInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorError?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorError?: (error: any) => any
}
export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyInterceptors<T>
  showLoading?: boolean
}
