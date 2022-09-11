import axios from 'axios'
import store from '@/store'
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
  // 在发送请求之前做些什么
    if (store.getters) {
      config.headers.Authorization = `Beaeer ${store.state.tokenObj.token}`
    }
    return config
  }, function (error) {
  // 对请求错误做些什么
    return Promise.reject(error)
  })
export default request
