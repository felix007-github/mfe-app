const path = require('path')
import vue from '@vitejs/plugin-vue'
import { defineConfig, searchForWorkspaceRoot } from 'vite'

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default defineConfig((command)=> {
  return {
    base: command.mode === 'dev' ? '/' : '/',
    server: {
      open: true,
      port: 9000,
      fs: {
        allow: [
          searchForWorkspaceRoot(process.cwd()),
          '/mygit/micro-zoe/micro-app/'
        ]
      },
      proxy: {
        '/api': {
          // target: 'https://noahark-dev.aicat.me',
          target: 'https://webtool-bkcf-dev.aicat.me',
          // target: 'https://webtool-bkcf-qa.aicat.me',
          changeOrigin: true,
          pathRewrite: {
            // 重写请求路径上匹配到的字段，如果不需要在请求路径上，重写为""
            '^/api': '/api'
          }
        },
        '/repo': {
          target: 'https://legis-repo-dev.aicat.me',
          // target: 'https://legis-repo-qa.aicat.me',
          changeOrigin: true,
          pathRewrite: {
            // 重写请求路径上匹配到的字段，如果不需要在请求路径上，重写为""
            '^/repo': '/api'
          }
        },
        '/version': {
          target: 'https://legis-repo-dev.aicat.me',
          // target: 'https://legis-repo-qa.aicat.me',
          changeOrigin: true,
          pathRewrite: {
            // 重写请求路径上匹配到的字段，如果不需要在请求路径上，重写为""
            '^/version': '/api'
          }
        }
      },
    },
    plugins: [vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => /^micro-app/.test(tag)
        }
      }
    })],
    resolve: {
      alias:{
        "@": resolve("src"),
        "~@": resolve("src"),
        "@c":resolve("src/components"),
      }
    }
  }
})
