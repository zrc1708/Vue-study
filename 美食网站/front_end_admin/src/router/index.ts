import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    component: Home
  },
  {
    path: '/recomment',
    name: '/recomment',
    component: Home
  },
  {
    path: '/category',
    name: '/category',
    component: Category
  },
  {
    path: '/food',
    name: '/food',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  // console.log(to.name)
  next()
  store.commit('setRouteName',to.name)
})

export default router
