import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/react-admin/:page*',
    name: 'reactAdmin',
    component: () => import('@/views/react-admin.vue')
  },
  {
    path: '/us-cms/:page*',
    name: 'vueUsWebTool',
    component: () => import('@/views/us-cms.vue')
  },
  {
    path: '/uk-cms/:page*',
    name: 'vueUkWebTool',
    component: () => import('@/views/uk-cms.vue')
  }
]

const router = createRouter({
  // createWebHashHistory hash 路由
  // createWebHistory history 路由
  // createMemoryHistory 带缓存 history 路由
  routes,
  history: createWebHistory()
  
})

export default router
