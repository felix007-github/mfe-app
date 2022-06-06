import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/react-admin*',
    name: 'reactAdmin',
    component: () => import('../pages/react-admin.vue')
  },
  {
    path: '/vue-console-ms*',
    name: 'vueConsoleMs',
    component: () => import('../pages/vue-console-ms.vue')
  },
  // {
  //   path: '/uk*',
  //   name: 'vueUkWebTool',
  //   component: () => import('../pages/vue-uk-web-tool.vue')
  // },
  {
    path: '/us*',
    name: 'vueUsWebTool',
    component: () => import('../pages/vue-us-web-tool.vue')
  },
  {
    path: '/uktemplate*',
    name: 'uktemplate',
    component: () => import('../pages/vue-uk-template.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
