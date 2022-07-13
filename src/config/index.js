/**
 * 环境变量配置
 */

const env = import.meta.env.MODE || 'prod'

const envConfig = {
  development:{
    baseUrl:'http://localhost:8899'
  },
  prod:{
    baseUrl:'http://localhost:9000'
  }
}

export default {
  env,
  mock:false,
  ...envConfig[env]
}