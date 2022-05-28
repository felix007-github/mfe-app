const path = require('path')
import { join } from 'path'
import { writeFileSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig, searchForWorkspaceRoot } from 'vite'

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default defineConfig((command, mode)=> {
  return {
    base: '/us-cms/',
    build: {
      outDir: 'vite',
    },
    server: {
      open: true,
      port: 9001,
      fs: {
        allow: [
          searchForWorkspaceRoot(process.cwd()),
          '/mygit/micro-zoe/micro-app/'
        ]
      }
    },
    resolve: {
      alias:{
        "@": resolve("src"),
        "~@": resolve("src"),
        "@c":resolve("src/components"),
      }
    },
    plugins: [
      vue(),
      (function () {
        let basePath = ''
        return {
          name: "vite:micro-app",
          apply: 'build',
          configResolved(config) {
            basePath = `${config.base}${config.build.assetsDir}/`
          },
          // writeBundle 钩子可以拿到完整处理后的文件，但已经无法修改
          writeBundle (options, bundle) {
            for (const chunkName in bundle) {
              if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
                const chunk = bundle[chunkName]
                if (chunk.fileName && chunk.fileName.endsWith('.js')) {
                  chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
                    return all.replace($3, new URL($3, basePath))
                  })
                  const fullPath = join(options.dir, chunk.fileName)
                  writeFileSync(fullPath, chunk.code)
                }
              }
            }
          },
        }
      })(),
    ]
  }
})
