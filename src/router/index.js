import { createRouter,createWebHashHistory} from 'vue-router'

const routes = [
  {
    path:'/',
    redirect:'/welcome',
    component:()=>import('../views/layout/index.vue'),
    meta:{
      title:'首页'
    },
    children:[
      {
        name:'welcome',
        path:'/welcome',
        component:()=>import('../views/welcome/index.vue'),
        meta:{
          title:'欢迎使用vue3开发'
        }
      },
      {
        name:'user',
        path:'/user',
        component:()=>import('../views/user/index.vue'),
        meta:{
          title:'用户管理'
        }
      },
    ]
  },
  {
    name:'login',
    path:'/login',
    component:()=>import('../views/login/index.vue')
  }
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router