
// 开发环境地址
let config: { baseUrl: string, [otherKey: string]: string }
config = {
  uscms: 'http://localhost:9001',
  reactAdmin: 'http://localhost:9999',
  baseUrl: import.meta.env.VITE_BASE_URL
}

// 线上环境地址
if (import.meta.env.PROD) {
  // 基座应用和子应用部署在同一个域名下，这里使用location.origin进行补全
  Object.keys(config).forEach((key) => {
    config[key] = window.location.origin
  })
  config.baseUrl = import.meta.env.VITE_BASE_URL
}

export default config
