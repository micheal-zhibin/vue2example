const baseConfig = require('./webpack.common');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const resolveApp = require('./paths');
const glob = require('glob');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'public',
        to: 'public',
        globOptions: {
          ignore: ['**/index.html'],
        },
      }],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:6].css',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${resolveApp('./src')}/**/*`, { nodir: true }),
    }),
    new CompressionPlugin({
      test: /\.(css|js)$/i,
      algorithm: 'gzip',
    }),
  ],
  optimization: {
    chunkIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 20000,
      minChunks: 1,
      cacheGroups: {
        syVendors: {
          test: /[\\/]node_modules[\\/]/,
          filename: 'js/[id]_verdor.js',
          priority: -10,
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
});