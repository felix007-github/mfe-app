const { join } = require("path");
const { defineConfig } = require("@vue/cli-service")
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

const port = 8886;
module.exports = defineConfig({
  publicPath: "/",
  outputDir: "dist",
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    port,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      "/api": {
        target: "https://legislation-us-dev.aicat.me/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use "~@/assets/styles/mixin.scss" as *;`
      }
    },
  },
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": join(__dirname, "src"),
        "@c": join(__dirname, "src/components"),
      },
    },
    output: {
      library: "us_legislation_cms_app",
      libraryTarget: "umd"
    },
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ]
  }
});
