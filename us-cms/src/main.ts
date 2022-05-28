
import App from './App.vue'
import store  from './store'
import router from './router'
import { createApp, App as AppInstance } from 'vue'

declare global {
  interface Window {
    __MICRO_APP_NAME__: string
    __MICRO_APP_ENVIRONMENT__: string
    __MICRO_APP_BASE_APPLICATION__: string
  }
}

let app: AppInstance | null = null

function mount() {
  const app = createApp(App)
  app.use(router)
  app.use(store)
  app.mount('#uscms')
}

function unmount () {
  app?.unmount()
  app = null
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
  window['micro-app-us-cms'] = { mount, unmount }
} else {
  mount()
}
