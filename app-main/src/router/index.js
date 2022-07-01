import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/a-home.vue')
  },
  {
    path: '/uk*',
    name: 'ukLegislationCms',
    component: () => import('@/pages/uk-legislation-cms.vue')
  },
  {
    path: '/us-cms*',
    name: 'usLegislationCms',
    component: () => import('@/pages/us-legislation-cms.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
