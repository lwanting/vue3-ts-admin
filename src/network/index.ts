import MyRequest from './request'
import localCache from '@/utils/cache'

const request = new MyRequest({
  baseURL: 'http://152.136.185.210:5000',
  timeout: 100000,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        } else {
          config.headers = { Authorization: `Bearer ${token}` }
        }
      }
      return config
    },
    requestInterceptorError: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorError: (err) => {
      return err
    }
  }
})

export default request
