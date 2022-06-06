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
    path: '/us-cms*',
    name: 'vueUsWebTool',
    component: () => import('../pages/vue-us-web-tool.vue')
  },
  {
    path: '/uk-cms*',
    name: 'vueUkWebTool',
    component: () => import('../pages/vue-uk-web-tool.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
