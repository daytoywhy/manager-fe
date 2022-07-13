import { createRouter,createWebHashHistory} from 'vue-router'

const routes = [
  {
    name:'signature',
    path:'/signature',
    component:()=>import('../views/signature/index.vue'),
    meta:{
      title:'签名'
    }
  },
  {
    name:'login',
    path:'/login',
    component:()=>import('../views/login/index.vue')
  },
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
        path:'/system/user',
        component:()=>import('../views/user/index.vue'),
        meta:{
          title:'用户管理'
        }
      },
      {
        name:'menuManage',
        path:'/system/menuManage',
        component:()=>import('../views/menuManage/index.vue'),
        meta:{
          title:'菜单管理'
        }
      },
    ]
  },
 
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router