/* eslint-disable @typescript-eslint/no-explicit-any */
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { Router } from "vue-router";
import microApp from "@micro-zoe/micro-app";
import { notifyMsg } from "./components/Message";
import { createApp, App as AppInstance } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 样式文件
import 'nprogress/nprogress.css'
import "./assets/styles/index.scss";

// microApp注入一个自定义标签
microApp.start({
  tagName: "micro-app-lib"
})

declare global {
  interface Window {
    moment: any;
    microApp: any;
    __MICRO_APP_NAME__: string;
    __MICRO_APP_PUBLIC_PATH__: string;
    __MICRO_APP_ENVIRONMENT__: string;
  }
}

function handleMicroData(): void {
  if (window.__MICRO_APP_ENVIRONMENT__) {
    window.microApp.addDataListener((data) => {
      console.log("addDataListener:", data);
    });
  }
}

let app: AppInstance | null = null;
let routers: Router | null = null;
function mount(): void {
  app = createApp(App);
  routers = router;
  app.use(routers);
  app.use(store);
  for (const key of Object.keys(ElementPlusIconsVue)) {
    app.component(key, ElementPlusIconsVue[key]);
  }
  // 自定义消息弹出框
  app.config.globalProperties.$notifyMsg = notifyMsg;
  app.mount("#us_legislation_cms_app");
  handleMicroData();
}

function unmount(): void {
  app?.unmount();
  app = null;
  routers = null;
}

if (window.__MICRO_APP_ENVIRONMENT__) {
  __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__;
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount };
} else {
  mount();
}
