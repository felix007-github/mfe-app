import { RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/task-center"
  },
  {
    path: "/task-center",
    name: "taskCenter",
    component: () => import("@/views/task-center/index.vue")
  },
  {
    path: "/au-verification",
    name: "auVerification",
    component: () => import("@/views/au-verification/index.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404.vue")
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404"
  }
]

export default routes