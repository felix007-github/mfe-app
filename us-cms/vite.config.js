import { join } from 'path'
import { writeFileSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

const port = 9001;
const assetsPath = process.env.NODE_ENV === 'production' ? '/us-cms/' : `http://localhost:${port}/`;
export default defineConfig((command, mode)=> {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: '/us-cms/',
    server: {
      port,
      open: true
    },
    resolve: {
      alias:{
        "@": join(__dirname, 'src'),
        "@c": join(__dirname, 'src/components'),
      }
    },
    plugins: [ vue() ],
    chainWebpack: (config) => {
      config.module
        .rule('fonts')
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 4096, // 小于4kb将会被打包成 base64
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]',
              publicPath: assetsPath,
            },
          },
        })
        .end();
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 4096, // 小于4kb将会被打包成 base64
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]',
              publicPath: assetsPath,
            },
          },
        });
    }
  }
})
