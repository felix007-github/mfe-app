import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter)
const routerIn = [
  {
    path:"/",
    redirect: '/home',
  },
  {
    path:"/home",
    name: "home",
    component: () => import("@/pages/home"),
    meta:{ title: "home" }
  },
  {
    path:"/setting",
    name: "settingPage",
    component: () => import("@/pages/setting"),
    meta:{ title: "settings" }
  }
];
const router = new VueRouter({
  base: '/uk-cms/',
  mode: 'history',
  routes: routerIn
})
// 路由拦截
router.beforeEach((to, from, next) => {
  next();
});
export default router