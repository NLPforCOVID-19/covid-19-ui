module.exports = {
  env: {
    API_URL: process.env.API_URL
  },
  // Pass envs to serve other than domain root.
  assetPrefix: process.env.BASE_PATH || '',
  publicRuntimeConfig: {
    basePath: process.env.BASE_PATH || '',
  },
};
