// const path = require('path')

module.exports = {
  outputDir: 'laout-main',
  publicPath: '/',
  productionSourceMap: false,
  devServer: {
    hot: false,
    disableHostCheck: true,
    port: 3000,
    open: true,
    overlay: {
      warnings: false,
      errors: true
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
    }
  },
  lintOnSave: false,
  // 自定义webpack配置
  configureWebpack: {
    entry: ['babel-polyfill', './src/main.js'],
    output: {
      jsonpFunction: 'webpackJsonp-laout-main'
    }
  }
}
