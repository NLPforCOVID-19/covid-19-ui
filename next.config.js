const path = require('path')

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    BASE_PATH: process.env.BASE_PATH || ''
  },
  // Pass envs to serve other than domain root.
  assetPrefix: process.env.BASE_PATH || '',
  publicRuntimeConfig: {
    basePath: process.env.BASE_PATH || '',
  },
  exportTrailingSlash: true,
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
