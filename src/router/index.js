import { createRouter,createWebHashHistory} from 'vue-router'

const routes = [
  {
    path:'/',
    redirect:'/home',
    component:()=>import('../views/layout/index.vue'),
    children:[
      {
        name:'home',
        path:'/home',
        component:()=>import('../views/home/index.vue'),
        meta:{
          title:'首页'
        }
      }
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