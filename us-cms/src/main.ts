import App from './App.vue'
import store  from './store'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createApp, App as AppInstance } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    microApp: any
    __MICRO_APP_NAME__: string
    __MICRO_APP_PUBLIC_PATH__: string
    __MICRO_APP_ENVIRONMENT__: string
  }
}

// 与基座的数据交互
async function handleMicroData () {
  // 是否是微前端环境
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    console.log('getData:', window.microApp.getData());
    // 监听基座下发的数据变化
    window.microApp.addDataListener((data) => {
      console.log('addDataListener:', data);
    })
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
  handleMicroData()
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