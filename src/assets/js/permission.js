import router from '../../router'

router.beforeEach((to,from,next)=>{
  const whiteList = ['/login','/signature']
  const token = sessionStorage.getItem('token')
  if(token){
    next()
  }else{
    if(whiteList.indexOf(to.path) !== -1){
      console.log(11);
      next()
    }
  }
})