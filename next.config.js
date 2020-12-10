const path = require('path')

module.exports = {
  basePath: process.env.BASE_PATH,
  trailingSlash: true,
  webpack: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@src': path.resolve(__dirname, 'src')
        }
      }
    }
  }
}
