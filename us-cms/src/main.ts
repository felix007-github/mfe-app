import App from './App.vue'
import store  from './store'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp, App as AppInstance } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

declare global {
  interface Window {
    __MICRO_APP_NAME__: string,
    __MICRO_APP_PUBLIC_PATH__: string,
    __MICRO_APP_ENVIRONMENT__: string,
    __MICRO_APP_BASE_APPLICATION__: string,
  }
}

let app: AppInstance | null = null

function mount() {
  const app = createApp(App)
  app.use(router)
  app.use(store)
  // 全局注册element-plus icon图标组件
  for (const key of Object.keys(ElementPlusIconsVue)) {
    app.component(key, ElementPlusIconsVue[key])
  }
  app.use(ElementPlus)
  app.mount('#uscms')
}

function unmount () {
  app?.unmount()
  app = null
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) {
  __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount()
}