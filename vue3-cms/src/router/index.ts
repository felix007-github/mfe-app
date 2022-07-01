import routes from "./router";
import NProgress from "nprogress";
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_ROUTER_BASE),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next() 
})

router.afterEach(() => {
  NProgress.done()
})

export default router
