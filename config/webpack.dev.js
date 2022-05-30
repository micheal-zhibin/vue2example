const baseConfig = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  devServer: {
    hot: 'only',
    port: 8000,
    compress: true,
    historyApiFallback: true,
  },
  optimization: {
    chunkIds: 'named'
  },
});