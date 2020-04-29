import Vue from 'vue'
import VueRouter from 'vue-router'
import Image from '../components/图片上传到图床'

Vue.use(VueRouter)
  const routes = [
    {path: '/image',component: Image}
]

const router = new VueRouter({
  routes
})

export default router
