const { join } = require('path')
const { defineConfig } = require('@vue/cli-service')
const port = 9001;
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
