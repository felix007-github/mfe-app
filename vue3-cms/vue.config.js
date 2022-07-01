const { join } = require('path')
const { defineConfig } = require('@vue/cli-service')
const port = 9002;
module.exports = defineConfig({
  publicPath: '/us-cms/',
  outputDir: 'dist',
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    port,
    open: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      "/api": {
        target: "http://172.29.80.13:8000/",
        changeOrigin: true,
        pathRewrite: {
          // 重写请求路径上匹配到的字段，如果不需要在请求路径上，重写为""
          "^/api": "",
        },
      }
    }
  },
  
  lintOnSave: false,
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias:{
        "@": join(__dirname, 'src'),
        "@c": join(__dirname, 'src/components'),
      }
    },
    output: {
      //资源打包路径
      library: "us-cms",
      libraryTarget: "umd"
    }
  }
})
