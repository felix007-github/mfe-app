// const path = require('path')

module.exports = {
  outputDir: 'caas-shell',
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
        target: 'https://webtool-bkcf-dev.aicat.me',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/repo': {
        target: 'https://legis-repo-dev.aicat.me',
        changeOrigin: true,
        pathRewrite: {
          '^/repo': '/api'
        }
      },
      '/version': {
        target: 'https://legis-repo-dev.aicat.me',
        changeOrigin: true,
        pathRewrite: {
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
      jsonpFunction: 'webpackJsonp-caas-shell'
    }
  }
}
