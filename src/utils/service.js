import axios from "axios"
import { ElMessage } from 'element-plus'
import config from "../config"

const service = axios.create({
  // baseURL:config.baseUrl,
  timeout:30000
})
service.interceptors.request.use((config)=>{
  if(sessionStorage.getItem('token')){
    config.headers['token'] = sessionStorage.getItem('token')
  }
  return config
},(error)=>{
  return Promise.reject(error)
})

service.interceptors.response.use(
  (response)=>{
    return response.data
  },
  (error)=>{
    if(error && error.response){
      switch (error.response.status){
        case 400:
          error.message = '错误请求'
          break;
        case 401:
          error.message = '未授权，请重新登录'
          break;
        case 403:
          error.message = '拒绝访问'
          break;
        case 404:
          error.message = '请求错误，未找到该资源'
          break;
        case 405:
          error.message = '请求方法未允许'
          break;
        case 408:
          error.message = '请求超时'
          break;
        case 500:
          error.message = '服务端错误'
          break;
        case 501:
          error.message = '网络未实现'
          break;
        case 502:
          error.message = '网络错误'
          break;
        case 503:
          error.message = '服务不可用'
          break;
        case 504:
          error.message = '网络超时'
          break;
        case 505:
          error.message = 'http版本不支持该请求'
          break;
        default:
          error.message = `连接错误${error.response.status}`

      }
    }else{
      if(JSON.stringify(error).includes('timeout')){
        ElMessage.error('服务器响应超时，请刷新当前页面')
      }
      error.message = '连接服务器失败'
    }
    console.log(error,'error');
    ElMessage.error(error.message)
    /***** 处理结束 *****/
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(error.response)
  }
)
export default service