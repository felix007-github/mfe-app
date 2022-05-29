
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import microApp from '@micro-zoe/micro-app'
microApp.start({
  plugins: {
    modules: {
      // 解决create-react-app中sockjs-node报错的问题
      'react-admin': [{
        loader (code) {
          if (process.env.NODE_ENV === 'dev' && code.indexOf('sockjs-node') > -1) {
            code = code.replace('window.location.port', '9999')
          }
          return code
        }
      }]
    }
  }
})
createApp(App)
.use(router)
.mount('#appBase')
