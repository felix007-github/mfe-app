const port = 9001;
const { join } = require('path')
module.exports = {
  publicPath: '/uk-cms/',
  outputDir: 'dist',
  productionSourceMap: false, // 生产环境的 source map
  lintOnSave: false,// eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  devServer: {
    port, // 端口号
    open: false, //配置自动启动浏览器
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // strat
    proxy: {
      '/api': {
        target: 'https://noahark-dev.aicat.me',
        // target: 'https://webtool-bkcf-qa.aicat.me',
        changeOrigin: true,
        pathRewrite: {
          // 重写请求路径上匹配到的字段，如果不需要在请求路径上，重写为""
          '^/api': '/api'
        }
      },
    },
  },
  css: {
    extract: {
      ignoreOrder: true
    },
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
  },
  configureWebpack: {
    resolve: {
      alias:{
        "@": join(__dirname, 'src'),
        "@c": join(__dirname, 'src/components'),
      }
    },
    output: {
      //资源打包路径
      library: "uk-cms",
      libraryTarget: "umd"
    }
  }
}