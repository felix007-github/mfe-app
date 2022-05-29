import Vue from 'vue';
import App from './App.vue';
import store from "./store";
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

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
  } else {
    await import('./assets/style/base.css')
  }
}

let instance = null;
function mount() {
  Vue.use(ElementUI);
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#uk-cms');
  handleMicroData()
}

function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount();
}