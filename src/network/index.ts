import MyRequest from './request'

const request = new MyRequest({
  baseURL: 'http://123.207.32.32:8000',
  timeout: 100000,
  interceptors: {
    requestInterceptor: (config) => {
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
