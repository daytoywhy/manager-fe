import http from '../utils/http'

const userUrl =  '/api/user'
export default{
  registry:(params)=>{
   return http.post(userUrl+'/register',params)
  },
  login:(params)=>{
    return http.post(userUrl+'/login',params)
  },
  addUsers:(params)=>{
    return http.post(userUrl+'/addUsers',params)
  }
}