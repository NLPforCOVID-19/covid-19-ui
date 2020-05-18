const path = require('path')

if (!process.env.API_URL) {
  throw new Error('API URL is not specified')
}
if (process.env.NODE_ENV === 'production') {
  if (!process.env.GA_TRACKING_ID) {
    throw new Error('Google Analytics ID is not specified')
  }
}

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    BASE_PATH: process.env.BASE_PATH || '',
    GA_TRACKING_ID: process.env.GA_TRACKING_ID
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
