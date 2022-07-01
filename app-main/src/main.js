import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import microApp from '@micro-zoe/micro-app'

Vue.config.productionTip = false
microApp.start({
  plugins: {
    modules: {
      // 解决create-react-app中sockjs-node报错的问题
      'react-admin': [{
        loader (code) {
          if (process.env.NODE_ENV === 'development' && code.indexOf('sockjs-node') > -1) {
            code = code.replace('window.location.port', '9999')
          }
          return code
        }
      }]
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#appBase')
