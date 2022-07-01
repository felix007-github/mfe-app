
// 开发环境地址
const config = {
  ukLegislationCms: 'http://localhost:8887',
  usLegislationCms: 'http://localhost:8886'
}

// 线上环境地址
if (process.env.NODE_ENV === 'production') {
  config.ukLegislationCms = 'https://uk-legislation-cms-dev.aicat.me'
}

export default config
