import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../components/login.vue'
const Login = () => import(/* webpackChunkName: "login_home_wlecome" */ '../components/login.vue')
// import Home from '../components/home.vue'
const Home = () => import(/* webpackChunkName: "login_home_wlecome" */ '../components/home.vue')
// import Welcome from '../components/welcome.vue'
const Welcome = () => import(/* webpackChunkName: "login_home_wlecome" */ '../components/welcome.vue')

// import Users from '../components/user/Users.vue'
const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/user/Users.vue')
// import Rights from '../components/power/Rights.vue'
const Rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/power/Rights.vue')
// import Roles from '../components/power/Roles.vue'
const Roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/power/Roles.vue')

// import Cate from '../components/goods/Cate.vue'
const Cate = () => import(/* webpackChunkName: "Cate_Params" */ '../components/goods/Cate.vue')
// import Params from '../components/goods/Params.vue'
const Params = () => import(/* webpackChunkName: "Cate_Params" */ '../components/goods/Params.vue')

// import Goodslsit from '../components/goods/List.vue'
const Goodslsit = () => import(/* webpackChunkName: "Goodslsit_Add" */ '../components/goods/List.vue')
// import Add from '../components/goods/Add.vue'
const Add = () => import(/* webpackChunkName: "Goodslsit_Add" */ '../components/goods/Add.vue')

// import Order from '../components/order/Order.vue'
const Order = () => import(/* webpackChunkName: "Order_Report" */ '../components/order/Order.vue')
// import Report from '../components/report/Report.vue'
const Report = () => import(/* webpackChunkName: "Order_Report" */ '../components/report/Report.vue')

// //引入nprogress
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css' //这个样式必须引入


Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/login'},
  {path:'/login',component:Login},
  {path:'/home',component:Home,redirect:'/welcome',children:[
    {path:'/welcome',component:Welcome},
    {path:'/users',component:Users},
    {path:'/rights',component:Rights},
    {path:'/roles',component:Roles},
    {path:'/categories',component:Cate},
    {path:'/params',component:Params},
    {path:'/goods',component:Goodslsit},
    {path:'/goods/add',component:Add},
    {path:'/orders',component:Order},
    {path:'/reports',component:Report},
  ]}
]

const router = new VueRouter({
  routes
})

router.afterEach(() => {
  NProgress.done()
})

// 挂载路由导航守卫  to表示将要访问的路径，from表示从哪个路径来
// next是一个函数，表示放行，next()放行，next('/login')强制跳转
router.beforeEach((to,from,next)=>{

  NProgress.start()

  if(to.path==='/login') return next()
  // 获取token
  const tokenStr =   window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router
