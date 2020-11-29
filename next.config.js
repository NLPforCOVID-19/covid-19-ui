const path = require('path')

if (!process.env.API_URL) {
  throw new Error('API URL is not specified')
}

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    BASE_PATH: process.env.BASE_PATH || '',
    GA_TRACKING_ID: process.env.GA_TRACKING_ID
  },
  basePath: process.env.BASE_PATH,
  trailingSlash: true,
  webpack: (config) => {
    const newConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@src': path.resolve(__dirname, 'src')
        }
      }
    }
    return newConfig
  }
}
