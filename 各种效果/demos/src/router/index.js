import Vue from 'vue'
import VueRouter from 'vue-router'
import Image from '../components/图片上传到图床'
import Md from '../components/读取md'
import Search from '../components/搜索联想'
import OnlineMd from '../components/读取网络md'

Vue.use(VueRouter)
  const routes = [
    {path: '/image',component: Image},
    {path: '/md',component: Md},
    {path: '/search',component: Search},
    {path: '/onlinemd',component: OnlineMd}
]

const router = new VueRouter({
  routes
})

export default router
