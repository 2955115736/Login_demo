import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../components/Register.vue')
  },
  {
    path:'/index',
    name:'index',
    component: () => import('../components/Index.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  if(to.path === '/' || to.path === '/register'){
    return next();
  };
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr){
    alert('请先进行用户登录!')
    return next('/');
  }
  next();
})

export default router
