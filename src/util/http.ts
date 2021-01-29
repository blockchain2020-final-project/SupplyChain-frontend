import axios from 'axios'
import { notification } from 'ant-design-vue'

const baseURL = 'http://39.99.211.12:3000'  // 后端api前缀

axios.defaults.baseURL = baseURL
axios.defaults.responseType = 'json'
axios.defaults.withCredentials = true

axios.interceptors.response.use(response => response, err => {
  // 在这里统一处理异常
  // notification.error({
  //   message: `请求失败（${err?.response?.status || '无连接'}）`,
  //   description: err?.response?.data?.message || err?.response?.data?.msg || err?.response?.data || '服务器未返回数据',
  //   class: 'error',
  //   duration: 3
  // })

  // 将异常继续交给路由层处理
  return Promise.reject(err?.response?.data || { msg: '请求失败' })
})

export default axios
