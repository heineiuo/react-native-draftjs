const path = require('path')
const createWebpackConfig = require('lolla/dist/createWebpackConfig')

module.exports = createWebpackConfig({
  __DEV__: false,
  compress: true,
  publicPathPrefix: 'https://cdn.jsdelivr.net/npm/',
  context: path.resolve('./'),
  entry: './index.js',
  externals: []
})
