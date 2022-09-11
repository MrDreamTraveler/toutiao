import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 懒加载的chunk 默认的名字是模块的路径
/* webpackChunkName: "新名字" */
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      }, {
        path: '/video',
        component: () => import(/* webpackChunkName: "base" */ '@/views/Video')
      }, {
        path: '/qa',
        component: () => import(/* webpackChunkName: "base" */ '@/views/QA')
      }, {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
