const path = require('path')
import vue from '@vitejs/plugin-vue'
import { defineConfig, searchForWorkspaceRoot } from 'vite'

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default defineConfig((command)=> {
  return {
    base: '/',
    server: {
      open: true,
      port: 9000,
      fs: {
        allow: [
          searchForWorkspaceRoot(process.cwd()),
          '/mygit/micro-zoe/micro-app/'
        ]
      }
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
        "@c":resolve("src/components"),
      }
    }
  }
})
