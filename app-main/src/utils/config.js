
// 开发环境地址
const config = {
  ukcms: 'http://localhost:9001',
  uscms: 'http://localhost:9002',
  reactAdmin: 'http://localhost:9999',
}

// 线上环境地址
if (process.env.NODE_ENV === 'production') {
  // 基座应用和子应用部署在同一个域名下，这里使用location.origin进行补全
  Object.keys(config).forEach((key) => {
    config[key] = window.location.origin
  })
}

export default config
